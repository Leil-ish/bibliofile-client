export default {
    'books': [
      {
        'id': '1',
        'title': 'How to Win',
        'author': "Lou Zer",
        'categories': "Self-Help",
        'description': 'Corporis accusamus placeat quas non voluptas.',
        'rating':5,
        'borrowed': false
      },
      {
        'id': '2',
        'title': 'Becoming Jane',
        'author': "Not Jane",
        'categories': "Romance",
        'description': 'Corporis accusamus placeat quas non voluptas.',
        'rating':4,
        'borrowed': false
      },
      {
        'id': '3',
        'title': 'On Ontology',
        'author': "Bee Ing",
        'categories': "Philosophy",
        'description': 'Corporis accusamus placeat quas non voluptas.',
        'rating':3,
        'borrowed': true
      }
    ],
    'notes': [
      {
        'id': '1',
        'bookId': '1',
        'title': 'A note about winning',
        'book': 'How to Win',
        'modified': 'January 31, 2018',
        'content': 'Corporis accusamus placeat quas non voluptas.'
      },
      {
        'id': '2',
        'bookId': '2',
        'book': 'Becoming Jane',
        'title': 'No one wants to be this Jane person',
        'modified': 'October 20, 1987',
        'content': 'Corporis accusamus placeat quas non voluptas.'
      },
      {
        'id': '3',
        'bookId': '3',
        'book': 'On Ontology',
        'title': 'Hauntology, more like',
        'modified': 'February 18, 1289',
        'content': 'Corporis accusamus placeat quas non voluptas.'
      },
   ]
}