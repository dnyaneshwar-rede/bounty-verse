"use client";

import React from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary"; // Changed to default import

// Dynamically import the MDX file
const MDXContent = dynamic(
  () =>
    import("@/app/blog/getting-started-with-bountyverse.mdx"),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <p>Loading...</p>, // Fallback UI
  }
);

const BlogPage: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
      Welcome to Our Blog
    </h1>
    <ErrorBoundary>
      <div className="prose lg:prose-xl mx-auto">
        <MDXContent />
      </div>
    </ErrorBoundary>
  </div>
);

export default BlogPage;