// This will eventually be dynamic.
var cards = [
  { src: 'images/dashboard/company-apps/edge.png' },
  { src: 'images/dashboard/company-apps/gotham.png' },
  { src: 'images/dashboard/company-apps/elli.png' },
  { src: 'images/dashboard/company-apps/connect.png' },
  { src: 'images/dashboard/company-apps/limo.png' },
  { src: 'images/dashboard/company-apps/open-house.png' },

  { src: 'images/dashboard/company-apps/stratus.png' },
  { src: 'images/dashboard/company-apps/update.png' },
  { src: 'images/dashboard/company-apps/xpressdocs.png' },
  { src: 'images/dashboard/company-apps/zillow.png' }
];

Template.dashboard.helpers({
  cards: cards,
  cardRows: function () {
    // Put 6 cards per row.
    // A row is an array of cards.
    var rowIndex = -1,
      rows = [];

    _.each(cards, function (card, index) {
      if (index % 6 === 0) {
        rows.push([]);
        rowIndex ++;
      }

      rows[rowIndex].push(card);
    });

    return rows;
  },
  rendered: function () {
    $('.company-image').backstretch('images/dashboard/elliman.jpg');

    this.cards = new Cards({
      $cards: self.$('.cards'),
      $scrollview: self.$('.horizontal-scroll-view')
    });
  }
});