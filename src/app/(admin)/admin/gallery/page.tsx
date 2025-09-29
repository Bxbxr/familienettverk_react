// src/app/(admin)/admin/gallery/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryImage } from "@/lib/types";
import { FaUpload, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

// Define the shape of the object returned by a successful upload promise
interface UploadResult {
  image_url: string;
  alt_text: null;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery images:", error);
      setError("Could not fetch gallery images.");
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (image: GalleryImage) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    const fileName = image.image_url.split("/").pop();
    if (!fileName) {
      setError("Invalid image URL, cannot determine file name to delete.");
      return;
    }

    const { error: storageError } = await supabase.storage
      .from("gallery-images")
      .remove([fileName]);

    if (storageError) {
      setError("Failed to delete image from storage. " + storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("gallery")
      .delete()
      .eq("id", image.id);

    if (dbError) {
      setError(
        "Failed to delete image record from database. " + dbError.message
      );
    } else {
      setImages(images.filter((img) => img.id !== image.id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesToUpload(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!filesToUpload || filesToUpload.length === 0) {
      setError("Please select one or more files to upload.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccessMessage(null);

    const uploadPromises = Array.from(filesToUpload).map(async (file) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error(`Failed to upload ${file.name}:`, uploadError);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: urlData } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(fileName);

      return { image_url: urlData.publicUrl, alt_text: null };
    });

    const results = await Promise.allSettled(uploadPromises);

    const successfulUploads = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<UploadResult>).value);

    const failedUploads = results.filter(
      (result) => result.status === "rejected"
    );

    if (successfulUploads.length > 0) {
      const { error: dbError } = await supabase
        .from("gallery")
        .insert(successfulUploads);

      if (dbError) {
        setError(`Database Insert Failed: ${dbError.message}`);
      } else {
        setSuccessMessage(
          `${successfulUploads.length} image(s) uploaded successfully!`
        );
      }
    }

    if (failedUploads.length > 0) {
      setError(
        `${failedUploads.length} image(s) failed to upload. Please check the console for details.`
      );
    }

    setFilesToUpload(null);
    (document.getElementById("file-input") as HTMLInputElement).value = "";
    await fetchImages();
    setUploading(false);
  };

  return (
    <div>
      <h1 className="h2 mb-4">Gallery Management</h1>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Upload New Images</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <div className="row g-3">
            <div className="col-md-10">
              <label htmlFor="file-input" className="form-label">
                Image Files
              </label>
              <input
                id="file-input"
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={handleUpload}
                disabled={uploading || !filesToUpload}
              >
                <FaUpload className="me-2" />
                {uploading ? `Uploading ${filesToUpload?.length}...` : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped table-borderless align-middle">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Preview</th>
                  <th scope="col">Alt Text / Description</th>
                  <th scope="col">Uploaded On</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Loading images...
                    </td>
                  </tr>
                ) : (
                  images.map((image) => (
                    <tr key={image.id}>
                      <td>
                        <Image
                          src={image.image_url}
                          alt={image.alt_text || "Gallery image"}
                          width={80}
                          height={80}
                          className="rounded"
                          style={{ objectFit: "cover" }}
                        />
                      </td>
                      <td className="text-muted">
                        {image.alt_text || "No description"}
                      </td>
                      <td>{new Date(image.created_at).toLocaleDateString()}</td>
                      <td className="text-end">
                        <a
                          href={image.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary me-2"
                          title="View Full Image"
                        >
                          <FaExternalLinkAlt />
                        </a>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(image)}
                          title="Delete Image"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {!loading && images.length === 0 && (
          <div className="card-footer text-center">
            No images found in the gallery. Use the uploader above to add some.
          </div>
        )}
      </div>
    </div>
  );
}
