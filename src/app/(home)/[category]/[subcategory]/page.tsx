import React from 'react';

const SubCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string, subcategory: string }>;
}) => {
  const { category, subcategory } = await params;
  console.log(category)
  return <div>{category} {subcategory}</div>;
};

export default SubCategoryPage;
