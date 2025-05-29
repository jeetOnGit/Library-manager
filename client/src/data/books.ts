
export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  availability: 'available' | 'borrowed' | 'reserved';
  location: string;
  dueDate?: string;
  image: string;
  description: string;
}

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    subject: 'Computer Science',
    availability: 'available',
    location: 'CS Library - Shelf A3',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    description: 'A comprehensive textbook on computer algorithms, widely used in universities worldwide. This book covers fundamental algorithms and data structures with detailed explanations and mathematical analysis.'
  },
  {
    id: '2',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    subject: 'Mathematics',
    availability: 'borrowed',
    location: 'Math Library - Shelf B2',
    dueDate: '2024-06-15',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    description: 'A comprehensive introduction to calculus with applications. Features clear explanations, abundant examples, and exercises designed to help students master calculus concepts.'
  },
  {
    id: '3',
    title: 'Physics for Scientists and Engineers',
    author: 'Raymond A. Serway',
    subject: 'Physics',
    availability: 'available',
    location: 'Science Library - Shelf C1',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    description: 'A thorough introduction to physics covering mechanics, thermodynamics, electromagnetism, and modern physics. Includes numerous real-world applications and problem-solving strategies.'
  },
  {
    id: '4',
    title: 'Organic Chemistry',
    author: 'Paula Yurkanis Bruice',
    subject: 'Chemistry',
    availability: 'reserved',
    location: 'Chemistry Library - Shelf D2',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=600&fit=crop',
    description: 'An engaging approach to organic chemistry that combines traditional presentation with modern pedagogical techniques. Features biological applications and real-world examples.'
  },
  {
    id: '5',
    title: 'Campbell Biology',
    author: 'Lisa A. Urry',
    subject: 'Biology',
    availability: 'available',
    location: 'Biology Library - Shelf E1',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=600&fit=crop',
    description: 'The world\'s most successful majors biology textbook. Provides a framework for understanding biology by exploring current research and connecting concepts across disciplines.'
  },
  {
    id: '6',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    subject: 'Literature',
    availability: 'available',
    location: 'Literature Library - Shelf F3',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    description: 'A classic novel of manners that follows the character development of Elizabeth Bennet. Widely regarded as one of the greatest works in English literature.'
  },
  {
    id: '7',
    title: 'A History of Modern Europe',
    author: 'John Merriman',
    subject: 'History',
    availability: 'borrowed',
    location: 'History Library - Shelf G1',
    dueDate: '2024-06-20',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    description: 'A comprehensive survey of European history from the Renaissance to the present. Combines political, social, cultural, and economic history in an engaging narrative.'
  },
  {
    id: '8',
    title: 'Psychology: The Science of Mind and Behaviour',
    author: 'Michael Passer',
    subject: 'Psychology',
    availability: 'available',
    location: 'Psychology Library - Shelf H2',
    image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop',
    description: 'An introduction to psychology that emphasizes the scientific approach to understanding human behavior. Covers all major areas of psychology with real-world applications.'
  }
];
