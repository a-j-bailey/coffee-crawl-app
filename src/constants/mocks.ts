import dayjs from 'dayjs';
import {
  IArticle,
  IArticleOptions,
  IBasket,
  ICategory,
  IExtra,
  ILocation,
  INotification,
  IProduct,
  IUser,
} from './types';

// users
export const USERS: IUser[] = [
  {
    id: 1,
    name: 'Devin Coldewey',
    department: 'Marketing Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?fit=crop&w=80&q=80',
  },
  {
    id: 2,
    name: 'Bella Audrey',
    department: 'Marketing Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=80&q=80',
  },
  {
    id: 3,
    name: 'Miriam Lendra',
    department: 'Desktop Publisher',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=80&q=80',
  },
  {
    id: 4,
    name: 'David Bishop',
    department: 'Marketing Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fit=crop&w=80&q=80',
  },
  {
    id: 5,
    name: 'Mathew Glock',
    department: 'HR Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fit=crop&w=80&q=80',
  },
  {
    id: 6,
    name: 'Emma Roberts',
    department: 'HR Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fit=crop&w=80&q=80',
  },
];

// following cards
export const FOLLOWING: IProduct[] = [
  {
    id: 1,
    type: 'vertical',
    title: 'Chimera',
    location: 'Tulsa',
    image: 'https://images.unsplash.com/photo-1516007112993-555f24caca6d?fit=crop&w=900&q=100',
    logo: 'https://d1835ylud4heuo.cloudfront.net/assets/merchants/logo/43153C15-D008-4A56-1587746100686-logo.jpg',
  },
  {
    id: 2,
    type: 'vertical',
    title: 'Cirque Coffee',
    location: 'Tulsa',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?fit=crop&w=450&q=80',
    logo: 'https://play-lh.googleusercontent.com/zCy3ngnrV7IUfHJ_LsJLzpZh4hx-dVIDzIU_0wiDQifZ39zr5vJYGEmdxpN5_EabNQ=w480-h960',
  },
  {
    id: 3,
    type: 'horizontal',
    title: 'Notion',
    location: 'Tulsa',
    image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?fit=crop&w=450&q=80',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEUAAAD6+vr////Nzc3k5OT5+fm0tLQsLCyurq7o6Oj29vYoKCjR0dEZGRnd3d3V1dWNjY3Dw8OhoaGBgYFERESVlZVbW1unp6e8vLwvLy9paWlRUVEkJCQTExNiYmLs7Ox4eHgWFhY9PT2YmJhKSkrRFSV3AAADQUlEQVR4nO2d604qMRhF2wojF0VUUMELyPH9n/FEDh5m+rUFnQRksddP2IldqaF0txmcE0IIIYQQQgghhBBCCCGEEEIIIYQQQghxzjz1OzX641J2uOhELA41zBZcBV8j9EvZy0Z2nT/UMFtw0Rx1WBayDMObQhZh6MNzPgsxvM1nGYY+XGezFMNeNgsx9IPXXJZiGLKrPsawk8tSDH2YZ7Icw6tMFmPow0c6CzJ8Smc5hj68J7Mkw7tkFmToB8ksyTDcp7IkQz9KZVGGyVWfZXiRyKIMvZ/YLMswtU1kGfqu3evDDMPUZGGGiVWfZmjLYZyhWfVphj48RFmeYVwO4wx9d9XM8gzDYzPLM/SD5qoPNIzKYaChbx4JEw3DWz2LNGwcCRMNm+Uw07BeDiMN/WC2zTIN6+Uw09AvtkfCUMNaOUw13G4ToYa1bSLW8H85TDHsmhs2w02WYthfxBrVJksxHN3FL31tEymGnUvjsSmHMYb2tc02kWM4N581y3WWY+j6sci/bSLIcBq6kcn65jDI0Jl/0/U2kWRYGcUXxzKcGMPPcphk6G7Mqu9ghksziWOYoVkwPl9mGf4xkziHGc4GscyFG6IM3ZOZxMkLy/DBGFavLEM3Mu+sYIb3dhJhhi5+I8GJGz7urOFO3dAufzRDd7u7Sz3iyPelZPiGN0wsGDTDMd7wNf5yijN0vV0nxEcb9/6UDe33NJph9NgMoqGpv3GGLj5q4xlOy7fCjjTq77DLcFhcMAiGts3AGT7HpzQ4Q1t/4wxNm4EzdIXPGoihuZuBM7Q1Kc2w0GZQDJ/xhvk2A2OYXTAwhte5HQbGMFt/cwwn+DnMPlzi0MP9AXsaztM7DJChvZuBM0zX3yRDc5mPZ2iPuGmG5jIfzjBZf7MMzWU+nGFqwYAZmst8OMMhfg4T9TfN8ANvaNsMnKG9/X24gf6Ybxma81KeYdxm8AxX+DmM62+g4dvpGV6FmOJPzbhOM3ygUbZh3ItJPwf6i3lVz1bFrBBCCCGEEOJ8mFZtyPyo0K/C7g+/xbGHvwe7n9dWQoa/gTMw9N0WnILhy+yyBbPdf0AIIYQQQgghhBBCCCGEEEIIIYQQQgghBJi/PFIs5H+gFRAAAAAASUVORK5CYII=',
  },
  {
    id: 4,
    type: 'vertical',
    title: 'Rattlesnake Cafe',
    location: 'Broken Arrow',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?fit=crop&w=450&q=80',
    logo: 'https://d1835ylud4heuo.cloudfront.net/assets/merchants/logo/4F6809E0-5476-44D9-1607038896281-logo.png',
  },
  {
    id: 5,
    type: 'vertical',
    title: 'Doubleshot Coffee',
    location: 'Tulsa',
    image: 'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?fit=crop&w=450&q=80',
    logo: 'https://doubleshot-coffee-company.square.site/uploads/b/ae28a430-c9ca-11ea-a859-173bdcd69377/577afb8fd0b513e542efe3e1220bdb7a.jpeg',
  },
  {
    id: 6,
    type: 'horizontal',
    title: 'Hodges Bend',
    location: 'Tulsa',
    image: 'https://images.unsplash.com/photo-1512192397443-4fd4ed400de3?fit=crop&w=450&q=80',
    logo: 'https://lh3.googleusercontent.com/vC0vnRJdlIKyZOyra7hk4-YguA9Nc3xVniWPHZp96zfgyKRALY1g0KEcICIiCJiilgFnCE-zOKJcyVHjuTIUTH9TduXK',
  },
];

// trending cards
export const TRENDING: IProduct[] = [
  {
    id: 1,
    type: 'horizontal',
    title: 'Hodges Bend',
    image:
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?fit=crop&w=450&q=80',
  },
  {
    id: 2,
    type: 'vertical',
    title: 'The highest status people.',
    image:
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?fit=crop&w=450&q=80',
  },
  {
    id: 3,
    type: 'vertical',
    title: 'Unique activities with local experts.',
    image:
      'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
  },
  {
    id: 4,
    type: 'vertical',
    title: 'Adventures - Multi day trips with meals and stays.',
    image:
      'https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?fit=crop&w=450&q=80',
  },
  {
    id: 5,
    type: 'vertical',
    title: 'New ways to meet your business goals.',
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
  },
];

// categories
export const CATEGORIES: ICategory[] = [
  {id: 1, name: 'Popular'},
  {id: 2, name: 'Newest'},
  {id: 3, name: 'Fashion'},
  {id: 4, name: 'Best deal'},
];

// article options
export const ARTICLE_OPTIONS: IArticleOptions[] = [
  {
    id: 1,
    title: 'Single room in center',
    description:
      'As Uber works through a huge amount of internal management turmoil, the company is also consolidating.',
    type: 'room',
    guests: 1,
    sleeping: {total: 1, type: 'sofa'},
    price: 89,
    user: USERS[0],
    image:
      'https://images.unsplash.com/photo-1543489822-c49534f3271f?fit=crop&w=450&q=80',
  },
  {
    id: 2,
    title: 'Cosy apartment',
    description:
      'Different people have different taste, and various types of music have many ways of leaving an impact on someone.',
    type: 'apartment',
    guests: 3,
    sleeping: {total: 2, type: 'bed'},
    price: 200,
    user: USERS[0],
    image:
      'https://images.unsplash.com/photo-1603034203013-d532350372c6?fit=crop&w=450&q=80',
  },
  {
    id: 3,
    title: 'Single room in center',
    description:
      'As Uber works through a huge amount of internal management turmoil, the company is also consolidating.',
    type: 'room',
    guests: 1,
    sleeping: {total: 1, type: 'sofa'},
    price: 89,
    user: USERS[0],
    image:
      'https://images.unsplash.com/photo-1543489822-c49534f3271f?fit=crop&w=450&q=80',
  },
];

// offers
export const OFFERS: IProduct[] = [
  {
    id: 1,
    type: 'vertical',
    title: 'Unique activities with local experts.',
    image:
      'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
  },
  {
    id: 2,
    type: 'vertical',
    title: 'The highest status people.',
    image:
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?fit=crop&w=450&q=80',
  },
  {
    id: 3,
    type: 'vertical',
    title: 'Get more followers and grow.',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=450&q=80',
  },
  {
    id: 4,
    type: 'vertical',
    title: 'New ways to meet your business goals.',
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
  },
];

// rental locations
export const LOCATIONS: ILocation[] = [
  {id: 1, city: 'Paris', country: 'France'},
  {id: 2, city: 'Rome', country: 'Italy'},
  {id: 3, city: 'London', country: 'United Kingdom'},
];

// articles
export const ARTICLES: IArticle[] = [
  {
    id: 1,
    title: 'Flexible office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[0],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
    user: USERS[0],
    timestamp: dayjs().unix(),
  },
  {
    id: 2,
    title: 'Global payments in a single integration.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay.',
    category: CATEGORIES[0],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?fit=crop&w=450&q=80',
    user: USERS[1],
    timestamp: dayjs().unix(),
  },
  {
    id: 3,
    title: 'Working with the latest technologies.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[0],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?fit=crop&w=450&q=80',
    user: USERS[2],
    timestamp: dayjs().unix(),
  },
  {
    id: 4,
    title: 'Office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[0],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
    user: USERS[3],
    timestamp: dayjs().unix(),
  },
  {
    id: 5,
    title: 'Office space means growth.',
    description: `The mission of LinkedIn is simple: connect the world's professionals.`,
    category: CATEGORIES[1],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?fit=crop&w=450&q=80',
    user: USERS[4],
    timestamp: dayjs().unix(),
  },
  {
    id: 6,
    title: 'Office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[1],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
    user: USERS[5],
    timestamp: dayjs().unix(),
  },
  {
    id: 7,
    title: 'Office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[1],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
    user: USERS[6],
    timestamp: dayjs().unix(),
  },
  {
    id: 8,
    title: 'Office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[2],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
    user: USERS[1],
    timestamp: dayjs().unix(),
  },
  {
    id: 9,
    title: 'Office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[2],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
    user: USERS[5],
    timestamp: dayjs().unix(),
  },
  {
    id: 10,
    title: 'Office space means growth.',
    description:
      'Rather than worrying about switching offices every couple years, you can instead stay in the same location.',
    category: CATEGORIES[2],
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fit=crop&w=450&q=80',
    user: USERS[6],
    timestamp: dayjs().unix(),
  },
  {
    id: 11,
    description:
      'A great to stay in Paris without feeling you are in the city!',
    category: CATEGORIES[3], // best deal
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?fit=crop&w=450&q=80',
    location: LOCATIONS[0],
    rating: 4.9,
    timestamp: dayjs().unix(),
  },
  {
    id: 12,
    description: 'Best Italy location in a bustling neighbourhood, 2 min.',
    category: CATEGORIES[3], // best deal
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1529154036614-a60975f5c760?fit=crop&w=450&q=80',
    location: LOCATIONS[1],
    rating: 4.5,
    timestamp: dayjs().unix(),
  },
  {
    id: 13,
    description:
      'The most beautiful and complex UI Kits built by Creative Tim.',
    category: CATEGORIES[3], // best deal
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?fit=crop&w=450&q=80',
    location: LOCATIONS[2],
    rating: 4.8,
    timestamp: dayjs().unix(),
  },
];

// rental recommendations
export const RECOMMENDATIONS: IArticle[] = [
  {
    id: 1,
    description:
      'A great to stay in Paris without feeling you are in the city!',
    category: CATEGORIES[3], // best deal
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?fit=crop&w=450&q=80',
    location: LOCATIONS[0],
    rating: 4.9,
    offers: OFFERS,
    timestamp: dayjs().unix(),
  },
  {
    id: 2,
    description: 'Best Italy location in a bustling neighbourhood, 2 min.',
    category: CATEGORIES[3], // best deal
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1529154036614-a60975f5c760?fit=crop&w=450&q=80',
    location: LOCATIONS[1],
    rating: 4.5,
    offers: OFFERS,
    timestamp: dayjs().unix(),
  },
  {
    id: 3,
    description:
      'The most beautiful and complex UI Kits built by Creative Tim.',
    category: CATEGORIES[3], // best deal
    options: ARTICLE_OPTIONS,
    image:
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?fit=crop&w=450&q=80',
    location: LOCATIONS[2],
    rating: 4.8,
    offers: OFFERS,
    timestamp: dayjs().unix(),
  },
];

// chat messages
export const MESSSAGES = [
  {
    _id: 1,
    text: 'Bye, bye 👋🏻',
    createdAt: dayjs().subtract(1, 'm').toDate(),
    user: {
      _id: USERS[0].id,
      name: USERS[0].name,
      avatar: USERS[0].avatar,
    },
  },
  {
    _id: 2,
    text: 'Ok. Cool! See you 😁',
    createdAt: dayjs().subtract(2, 'm').toDate(),
    user: {
      _id: USERS[1].id,
      name: USERS[1].name,
      avatar: USERS[1].avatar,
    },
  },
  {
    _id: 3,
    text: 'Sure, just let me finish somerhing and I’ll call you.',
    createdAt: dayjs().subtract(3, 'm').toDate(),
    user: {
      _id: USERS[0].id,
      name: USERS[0].name,
      avatar: USERS[0].avatar,
    },
  },
  {
    _id: 4,
    text: 'Hey there! How are you today? Can we meet and talk about location? Thanks!',
    createdAt: dayjs().subtract(4, 'm').toDate(),
    user: {
      _id: USERS[1].id,
      name: USERS[1].name,
      avatar: USERS[1].avatar,
    },
  },
];

// extras cards
export const EXTRAS: IExtra[] = [
  {
    id: 1,
    name: 'BMW X5',
    time: dayjs().format('hh:00'),
    image: require('../assets/images/x5.png'),
    saved: false,
    booked: false,
    available: true,
  },
  {
    id: 2,
    name: 'Tesla',
    time: dayjs().format('hh:00'),
    image: require('../assets/images/tesla.png'),
    saved: false,
    booked: false,
    available: true,
  },
  {
    id: 3,
    name: 'Mercedes GLE',
    time: dayjs().format('hh:00'),
    image: require('../assets/images/gle.png'),
    saved: false,
    booked: false,
    available: false,
  },
];

// shopping basket recommentations
export const BASKET_RECOMMENDATIONS: IBasket['items'] = [
  {
    id: 4,
    title: 'Polo T-Shirt',
    description: 'Impeccably tailored in Italy.',
    image:
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?fit=crop&w=450&q=80',
    stock: true,
    qty: 1,
    size: 'M',
    price: 200,
  },
  {
    id: 5,
    title: 'Orange Jacket',
    description: 'Mustard About Me - South Africa',
    image:
      'https://images.unsplash.com/photo-1599407950360-8b8642d423dc?fit=crop&w=450&q=80',
    stock: true,
    qty: 1,
    size: 'M',
    price: 489,
  },
];

// shopping basket
export const BASKET: IBasket = {
  subtotal: 750,
  recommendations: BASKET_RECOMMENDATIONS,
  items: [
    {
      id: 1,
      title: 'Leather Jacket',
      description: 'Impeccably tailored in Italy from lightweight navy.',
      image:
        'https://images.unsplash.com/photo-1562751361-ac86e0a245d1?fit=crop&w=450&q=80',
      stock: true,
      qty: 1,
      size: 'M',
      price: 250,
      qtys: [1, 2, 3, 4, 5],
      sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    {
      id: 2,
      title: 'Dark T-Shirt',
      description: 'Dark-grey slub wool, pintucked notch lapels.',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fit=crop&w=450&q=80',
      stock: true,
      qty: 1,
      size: 'l',
      price: 150,
      qtys: [1, 2, 3, 4, 5],
      sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    {
      id: 3,
      title: 'Leather Handbag',
      description: "Immaculate tailoring is TOM FORD's forte",
      image:
        'https://images.unsplash.com/photo-1608060434411-0c3fa9049e7b?fit=crop&w=450&q=80',
      stock: true,
      qty: 1,
      size: 'm',
      price: 350,
      qtys: [1, 2, 3],
      sizes: ['s', 'm', 'l'],
    },
  ],
};

// notifications
export const NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    subject: 'New Message',
    message: 'You have a new message from the owner.',
    type: 'document',
    business: true,
    read: false,
    createdAt: dayjs().subtract(2, 'h').toDate(),
  },
  {
    id: 2,
    subject: 'New Order',
    message: 'A confirmed request by one client.',
    type: 'extras',
    business: true,
    read: false,
    createdAt: dayjs().subtract(4, 'h').toDate(),
  },
  {
    id: 3,
    subject: 'New Likes',
    message: 'Your posts have been liked by 2,342.',
    type: 'notification',
    business: true,
    read: true,
    createdAt: dayjs().subtract(6, 'h').toDate(),
  },
  {
    id: 4,
    subject: 'Last Message',
    message: 'Your posts have been liked by 2,342.',
    type: 'document',
    business: true,
    read: true,
    createdAt: dayjs().subtract(2, 'd').toDate(),
  },
  {
    id: 5,
    subject: 'Check your profile',
    message: 'Your profile has new updates.',
    type: 'profile',
    business: true,
    read: true,
    createdAt: dayjs().subtract(3, 'd').toDate(),
  },
  {
    id: 6,
    subject: 'Product Update',
    message: 'Your product has been updated',
    type: 'documentation',
    business: true,
    read: true,
    createdAt: dayjs().subtract(2, 'w').toDate(),
  },
  {
    id: 7,
    subject: 'Last Message',
    message: 'Your posts have been liked by 2,342.',
    type: 'document',
    business: true,
    read: true,
    createdAt: dayjs().subtract(3, 'w').toDate(),
  },
  {
    id: 8,
    subject: 'Learn new things',
    message:
      'Like so many organizations these days, Autodesk is a company in transition. It was until recently.',
    type: 'document',
    business: false,
    read: false,
    createdAt: dayjs().subtract(2, 'h').toDate(),
  },
  {
    id: 9,
    subject: 'Give your best',
    message:
      'The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color.',
    type: 'payment',
    business: false,
    read: false,
    createdAt: dayjs().subtract(9, 'h').toDate(),
  },
  {
    id: 10,
    subject: 'Come and meet us',
    message:
      'Technology is applied science. Science is the study of nature. Mathematics is the language of nature.',
    type: 'office',
    business: false,
    read: false,
    createdAt: dayjs().subtract(12, 'h').toDate(),
  },
];

export default {
  USERS,
  FOLLOWING,
  TRENDING,
  CATEGORIES,
  ARTICLES,
  RECOMMENDATIONS,
  MESSSAGES,
  EXTRAS,
  NOTIFICATIONS,
};
