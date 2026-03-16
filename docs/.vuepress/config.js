module.exports = {
  title: 'Odoo Technical Course',
  description: 'Backend Technical Consultant Onboarding (BTCO) training program',
  base: '/odoo-technical-course/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Solutions', link: '/solutions/' },
      { text: 'Odoo Doc', link: 'https://www.odoo.com/documentation/master/developer.html' }
    ],
    sidebar: {
      '/solutions/': [
        '',
        'flower_shop',
        'gems_education'
      ],
      '/': [
        ''
      ]
    }
  }
}
