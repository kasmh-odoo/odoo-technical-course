module.exports = {
  title: 'Odoo Technical Course',
  description: 'TCO exercises repo',
  // Ensure this matches your GitHub repository name exactly
  base: '/odoo-technical-course/', 
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/your-username/odoo-technical-course' }
    ],
    sidebarDepth: 1, // Increased to 1 to show headers within pages
    displayAllHeaders: false, 
    sidebar: [
      {
        title: 'Introduction',
        path: '/',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: "Exercises",
        collapsable: false,
        children: [
          {
            title: "Eagle Estates",
            collapsable: true,
            // Point to the folder index (docs/exercises/eagle_estates/README.md or index.md)
            path: "/exercises/eagle_estates/", 
            children: [
              "/exercises/eagle_estates/part_1",
              "/exercises/eagle_estates/part_2",
              "/exercises/eagle_estates/part_3",
              "/exercises/eagle_estates/part_4",
              "/exercises/eagle_estates/part_5",
              "/exercises/eagle_estates/part_6",
              "/exercises/eagle_estates/part_7",
              "/exercises/eagle_estates/part_8",
              "/exercises/eagle_estates/part_9",
              "/exercises/eagle_estates/part_10",
              "/exercises/eagle_estates/part_11",
              "/exercises/eagle_estates/part_12",
              "/exercises/eagle_estates/part_13",
              "/exercises/eagle_estates/part_14",
              "/exercises/eagle_estates/part_15",
            ]
          }
        ]
      }
    ]
  }
}