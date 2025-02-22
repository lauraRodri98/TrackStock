import '@/app/ui/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBoxOpen, faTruckField, faList, faGear } from '@fortawesome/free-solid-svg-icons'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className='bg-gray-100'>
      <body className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-sky-950 text-white h-screen p-5 fixed ">
          <span className='flex '>
            <h1 className="font-serif text-4xl rounded text-amber-500 mb-5 border-solid border-amber-500 border px-2 me-1 border-white-600 ms-5">I</h1>
            <h2 className="text-3xl mb-5 font-thin text-whote ">nventory</h2>
          </span>

          <ul className='mt-3 border-top'>
            <li className="mb-4">
              <a href="/" className="group relative hover:text-white p-2 rounded flex items-center tracking-wider">
              <FontAwesomeIcon icon={faHouse} className="mr-3 size-5" />
              INICIO
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>            
            <li className="mb-4">
              <a href="/productos" className="group relative hover:text-white p-2 rounded flex items-center tracking-wider">
              <FontAwesomeIcon icon={faBoxOpen} className="mr-3 size-5"/>
                PRODUCTOS
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>

            <li className="mb-4">
              <a href="proveedor" className="group relative hover:text-white p-2 rounded flex items-center tracking-wider">
              <FontAwesomeIcon icon={faTruckField} className="mr-3 size-5"/>
                PROVEEDOR
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>

            <li className="mb-4">
              <a href="categorias" className="group relative hover:text-white p-2 rounded flex items-center tracking-wider"> 
              <FontAwesomeIcon icon={faList} className="mr-3 size-5"/>
                CATEGORÍAS
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
