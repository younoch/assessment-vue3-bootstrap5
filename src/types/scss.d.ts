// Type definitions for SCSS modules
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// Type definitions for CSS modules
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Type definitions for Bootstrap Icons
declare module 'bootstrap-icons/font/bootstrap-icons.css' {
  const content: string;
  export default content;
}
