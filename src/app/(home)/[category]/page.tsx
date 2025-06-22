import React from 'react';

const CategoryPage = async({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  console.log(category);
  return <div>{category} page</div>;
};

export default CategoryPage;
