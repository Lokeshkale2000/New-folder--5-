import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./BlogPostForm.css";

const BlogPostForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    author: Yup.string().required("Author is required"),
    image: Yup.mixed()
      .required("An image file is required")
      .test(
        "fileType",
        "Only PNG, JPG, and JPEG files are allowed",
        (value) => {
          return (
            value &&
            ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          );
        }
      )
      .test("fileSize", "File size must be less than 6 MB", (value) => {
        return value && value.size <= 6 * 1024 * 1024; 
      }),
  });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images"); 

    const uploadResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dobtzmaui/image/upload", 
      formData
    );
    return uploadResponse.data.secure_url;
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    try {
      let imageUrl = await handleImageUpload(values.image);
      const postData = {
        title: values.title,
        content: values.content,
        author: values.author,
        image: imageUrl,
      };

      await axios.post("https://new-folder-5-rouge.vercel.app/api/posts", postData);
      setTimeout(() => navigate("/home"), 1000);
      console.log(postData); // Redirect after 2 seconds
    } catch (error) {
      console.error("Failed to add post:", error);
      setFieldError("image", "Failed to upload image. Please try again."); 
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="blog-post-form">
      <h3 className="header">Add New Post</h3>
      <Formik
        initialValues={{ title: "", content: "", author: "", image: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field type="text" id="title" name="title" />
             
            </div>
            <div className="form-group">
              <label htmlFor="content" className="content-box">Content</label>
              <Field as="textarea" id="content" name="content" />
            
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <Field type="text" id="author" name="author" />
           
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              
            </div>
            <button
              type="submit"
              className="button"
              disabled={isSubmitting || loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <ErrorMessage
                name="image"
                component="div"
                className="error-message"
              />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogPostForm;
