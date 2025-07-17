"use client";
import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { client } from "@/sanity/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, PRODUCT_CONDITIONS } from "../../constants"; // Import constants
import { Textarea } from "../ui/textarea";

interface ProductFormValues {
  title: string;
  slug: string;
  publishedAt: string;
  images: {
    image: File | null;
    image2: File | null;
    image3: File | null;
    image4: File | null;
  };
  category: string;
  condition: string;
  price: number | "";
  body: string;
  publishStatus: string;
}

const initialValues: ProductFormValues = {
  title: "",
  slug: "",
  publishedAt: new Date().toISOString(),
  images: {
    image: null,
    image2: null,
    image3: null,
    image4: null,
  },
  category: "",
  condition: "",
  price: "",
  body: "",
  publishStatus: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  publishedAt: Yup.date().required("Published date is required"),
  category: Yup.string().required("Category is required"),
  condition: Yup.string().required("Condition is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  publishStatus: Yup.string().required("Publish status is required"),
});

const uploadImage = async (file: File): Promise<string> => {
  try {
    const asset = await client.assets.upload("image", file);
    return asset._id; // Return the image ID to reference in the document
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

const handleSubmit = async (
  values: ProductFormValues,
  {
    setSubmitting,
    resetForm,
  }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
): Promise<void> => {
  try {
    const uploadedImages: Record<
      string,
      { _type: string; asset: { _ref: string } } | null
    > = {};

    // Upload each image if provided
    for (const [key, file] of Object.entries(values.images)) {
      if (file) {
        const imageId = await uploadImage(file as File);
        uploadedImages[key] = { _type: "image", asset: { _ref: imageId } };
      } else {
        uploadedImages[key] = null;
      }
    }

    // Create the product document
    await client.create({
      _type: "product",
      title: values.title,
      slug: values.slug,
      publishedAt: values.publishedAt,
      ...uploadedImages, // Spread uploaded images into the document
      category: values.category,
      condition: values.condition,
      price: values.price,
      body: values.body,
      publishStatus: values.publishStatus,
    });

    alert("Product created successfully!");
    resetForm();
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Failed to create product.");
  } finally {
    setSubmitting(false);
  }
};

const ProductForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-6 max-w-lg mx-auto">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" type="text" placeholder="Enter product title" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input name="slug" type="text" placeholder="Enter product slug" />
            <ErrorMessage
              name="slug"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="publishedAt">Published At</Label>
            <Input name="publishedAt" type="datetime-local" />
            <ErrorMessage
              name="publishedAt"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          {/* Image Upload Fields */}
          <div>
            <Label htmlFor="image">Image 1</Label>
            <Input
              name="image"
              type="file"
              onChange={(event) =>
                setFieldValue(
                  "images.image",
                  event.currentTarget.files?.[0] || null
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="image2">Image 2</Label>
            <Input
              name="image2"
              type="file"
              onChange={(event) =>
                setFieldValue(
                  "images.image2",
                  event.currentTarget.files?.[0] || null
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="image3">Image 3</Label>
            <Input
              name="image3"
              type="file"
              onChange={(event) =>
                setFieldValue(
                  "images.image3",
                  event.currentTarget.files?.[0] || null
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="image4">Image 4</Label>
            <Input
              name="image4"
              type="file"
              onChange={(event) =>
                setFieldValue(
                  "images.image4",
                  event.currentTarget.files?.[0] || null
                )
              }
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setFieldValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CATEGORIES).map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage
              name="category"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="condition">Condition</Label>
            <Select
              onValueChange={(value) => setFieldValue("condition", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a condition" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PRODUCT_CONDITIONS).map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    {condition.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage
              name="condition"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="number"
              placeholder="Enter product price"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea name="body" placeholder="Enter product description" />
          </div>

          <div>
            <Label htmlFor="publishStatus">Publish Status</Label>
            <Select
              onValueChange={(value) => setFieldValue("publishStatus", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage
              name="publishStatus"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
