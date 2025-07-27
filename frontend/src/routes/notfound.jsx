import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NotFount = () => (
    <>
        <div className="flex min-h-screen flex-col bg-gray-100 justify-center bg-center">
            <div className="container mx-auto rounded-md bg-[#0032A0]  px-10 sm:max-w-sm ">
                <div className="mb-4  mt-4 flex justify-center text-center  text-2xl  font-semibold capitalize text-white">
                    Ruta no encontrada
                </div>
                <div className="m-4 flex justify-center">
                    <NavLink to="/">
                        <button className="m-2 w-40 rounded-full border-2 border-white  bg-[#0032A0] p-1.5 text-center text-white shadow-md hover:bg-white hover:text-black hover:cursor-pointer">
                            <FontAwesomeIcon
                                className="pr-2"
                                icon={faArrowLeft}
                            />
                            Volver
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    </>
);
export default NotFount;