module.exports = {
  title: 'Odoo Technical Course',
  description: 'TCO exercises repo',
  base: '/odoo-technical-course/', // Required for GitHub Pages
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/your-username/odoo-technical-course' }
    ],
    sidebar: [
      '/',
      '/guide/',
      {
        title: "Exercises",
        collapsable: false,
        path: "/",
        initialOpenGroupIndex: -1,
        children: [
          {
            title: "Eagle Estates",
            collapsable: true,
            path: "/docs/exercises/eagle_estates/index.html",
            children: [
              {
                title: "Part 1",
                path: "/docs/exercises/eagle_estates/part_1.html",
              },
              {
                title: "Part 2",
                path: "/docs/exercises/eagle_estates/part_2.html",
              },
              {
                title: "Part 3",
                path: "/docs/exercises/eagle_estates/part_3.html",
              },
              {
                title: "Part 4",
                path: "/docs/exercises/eagle_estates/part_4.html",
              },
              {
                title: "Part 5",
                path: "/docs/exercises/eagle_estates/part_5.html",
              },
              {
                title: "Part 6",
                path: "/docs/exercises/eagle_estates/part_6.html",
              },
              {
                title: "Part 7",
                path: "/docs/exercises/eagle_estates/part_7.html",
              },
              {
                title: "Part 8",
                path: "/docs/exercises/eagle_estates/part_8.html",
              },
              {
                title: "Part 9",
                path: "/docs/exercises/eagle_estates/part_9.html",
              },
              {
                title: "Part 10",
                path: "/docs/exercises/eagle_estates/part_10.html",
              },
              {
                title: "Part 11",
                path: "/docs/exercises/eagle_estates/part_11.html",
              },
              {
                title: "Part 12",
                path: "/docs/exercises/eagle_estates/part_12.html",
              },
              {
                title: "Part 13",
                path: "/docs/exercises/eagle_estates/part_13.html",
              },
              {
                title: "Part 14",
                path: "/docs/exercises/eagle_estates/part_14.html",
              },
              {
                title: "Part 15",
                path: "/docs/exercises/eagle_estates/part_15.html",
              },
            ]
          }
        ]
      }
    ]
  }
}
