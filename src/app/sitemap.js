export default function sitemap() {
  const baseUrl = 'https://autonova.az';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/automobiles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // You can add dynamic pages here
  // For example, if you have automobile detail pages:
  // const automobiles = await getAutomobiles();
  // const automobilePages = automobiles.map((auto) => ({
  //   url: `${baseUrl}/automobiles/${auto.id}`,
  //   lastModified: new Date(auto.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  return [
    ...staticPages,
    // ...automobilePages,
  ];
}