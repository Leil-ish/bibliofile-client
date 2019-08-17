export default {
    'books': [
      {
        'libraryId': '1',
        'title': 'How to Win',
        'author': "Lou Zer",
        'categories': "Self-Help",
        'textSnippet': 'Corporis accusamus placeat quas non voluptas.',
        'rating':5,
        'borrowed': false
      },
      {
        'libraryId': '2',
        'title': 'Becoming Jane',
        'author': "Not Jane",
        'categories': "Romance",
        'textSnippet': 'Corporis accusamus placeat quas non voluptas.',
        'rating':4,
        'borrowed': false
      },
      {
        'libraryId': '3',
        'title': 'On Ontology',
        'author': "Bee Ing",
        'categories': "Philosophy",
        'textSnippet': 'Corporis accusamus placeat quas non voluptas.',
        'rating':3,
        'borrowed': true
      }
    ],
    'notes': [
      {
        'noteId': '1',
        'libraryId': '1',
        'title': 'A note about winning',
        'book': 'How to Win',
        'modified': 'January 31, 2018',
        'content': 'Corporis accusamus placeat quas non voluptas.'
      },
      {
        'noteId': '2',
        'libraryId': '2',
        'book': 'Becoming Jane',
        'title': 'No one wants to be this Jane person',
        'modified': 'October 20, 1987',
        'content': 'Corporis accusamus placeat quas non voluptas.'
      },
      {
        'noteId': '3',
        'libraryId': '3',
        'book': 'On Ontology',
        'title': 'Hauntology, more like',
        'modified': 'February 18, 1289',
        'content': 'Corporis accusamus placeat quas non voluptas.'
      },
   ]
}