import React from 'react';

const footer = () => {
  return (
    <footer className='h-36 bg-sky-950  flex justify-center items-center ml-52 -mb-10 -me-10'>
      <div className="container mx-auto text-center px-4">
        <p className="text-md text-white">
          Laura Rodríguez | Diseñadora UX/UI |
          <a
            className="ms-2 text-sky-400 hover:text-white transition-all duration-200"
            href="https://www.linkedin.com/in/laura-rodriguez-perales-315753154/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            className="ms-2 text-sky-400 hover:text-white transition-all duration-200"
            href="https://github.com/lauraRodri98"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
        <p className="text-md text-white mt-5 text-sm">© 2025 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default footer;
