# AMEC GRUP Website

A modern, responsive website for AMEC GRUP, a Romanian construction company specializing in sandwich panels, Lindab roofing, and comprehensive construction services.

![AMEC GRUP Website](public/construction-hero.svg)

## Overview

This project is a corporate website built for AMEC GRUP, featuring a clean, modern design with comprehensive information about the company's services, projects, and contact details. The website is fully responsive and optimized for both desktop and mobile devices.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Glass-morphism effects, animations, and smooth transitions
- **Service Showcase**: Detailed presentation of all company services
- **Projects Section**: Portfolio of completed projects (placeholder ready for future content)
- **Contact Section**: Direct phone contact with modal for desktop and phone app integration on mobile
- **SEO Optimized**: Complete metadata implementation for search engines and social sharing
- **Multi-Language Support**: Romanian language implementation

## Key Sections

- **Hero Banner**: Featuring main services and call-to-action buttons
- **Services**: Detailed cards for each service offering
- **About Us**: Company history, experience, and unique selling points
- **Projects**: Portfolio section (currently placeholder for future content)
- **Contact**: Phone contact information with easy access buttons

## Technology Stack

- **Frontend Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS with custom components
- **UI Components**: shadcn/ui component library
- **Animations**: Custom animations for page elements
- **Icons**: Lucide React icons
- **Deployment**: Compatible with Vercel, Netlify, or custom hosting

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/amecgrup.git
cd amecgrup
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build and Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
amecgrup/
├── components/       # Reusable UI components
├── public/           # Static assets
├── src/              # Source code
│   ├── app/          # App router pages and layouts
│   │   ├── page.tsx  # Homepage component
│   │   └── layout.tsx # Root layout with metadata
│   └── styles/       # Global styles
└── ...               # Configuration files
```

## Customization

### Changing Content

Most of the website content can be modified in the `src/app/page.tsx` file. Services, about information, and contact details are all located here.

### Styling

The project uses Tailwind CSS for styling. Global styles are in `src/app/globals.css`, and component-specific styles are applied using Tailwind classes.

### Adding Projects

The projects section is prepared with a placeholder. To add actual projects, modify the projects section in `src/app/page.tsx`.

## SEO Optimization

The website includes comprehensive SEO metadata in `src/app/layout.tsx`, including:

- Title and description
- OpenGraph and Twitter card data
- Keywords and other metadata
- Romanian language specification

## Credits

- Design and Development: [WhoZoom](https://whozoom.tech)
- Icons: [Lucide React](https://lucide.dev)
- UI Components: [shadcn/ui](https://ui.shadcn.com)

## License

This project is proprietary and belongs to AMEC GRUP.

## Contact

For any inquiries about this website, please contact:
- Phone: +40773928274
- Website: [https://amecgrup.ro/](https://amecgrup.ro/)
