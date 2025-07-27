import React from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaLinkedin,
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaGlobe,
} from "react-icons/fa";
import ChangeLanguage from "../ChangeLanguage";
import Logo from "../Logo";
import { Divider } from "primereact/divider";

const Footer: React.FC = () => {
    return (
        <>
            <Divider className="mb-6" />
            <footer className="bg-white text-gray-800 pt-10 pb-6 mt-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                    <div className="lg:col-span-1 space-y-4">
                        <Logo size="2xl" />
                        <p className="text-sm text-gray-600">
                            Transformação digital que realmente funciona.
                        </p>
                    </div>

                    {/* Coluna 2 - Empresa */}
                    <div className="space-y-2">
                        <h3 className="text-md font-semibold">Empresa</h3>
                        <div className="flex flex-col space-y-1 text-sm text-gray-700">
                            <Link to="/about" className="hover:text-orange-500 text-black no-underline">Sobre Nós</Link>
                            <Link to="/services" className="hover:text-orange-500 text-black no-underline">Serviços</Link>
                            <Link to="/testimonials" className="hover:text-orange-500 text-black no-underline">Testemunhos</Link>
                            <Link to="/contact" className="hover:text-orange-500 text-black no-underline">Contato</Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-md font-semibold">Navegação</h3>
                        <div className="flex flex-col space-y-1 text-sm text-gray-700">
                            <Link to="/" className="hover:text-orange-500 text-black no-underline">Página Inicial</Link>
                            <Link to="/services" className="hover:text-orange-500 text-black no-underline">Nossos Serviços</Link>
                            <Link to="/why-us" className="hover:text-orange-500 text-black no-underline">Por que escolher a Booknfix</Link>
                            <Link to="/testimonials" className="hover:text-orange-500 text-black no-underline">Clientes Satisfeitos</Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-md font-semibold">Contato</h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-orange-500" />
                                <span>suporte@booknfix.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-orange-500" />
                                <span>(11) 99999-9999</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-orange-500" />
                                <span>São Paulo, Brasil</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaGlobe className="text-orange-500" />
                            <span className="text-sm text-gray-600">Idioma:</span>
                            <ChangeLanguage />
                        </div>

                        <Divider />

                        <div className="flex gap-3 mt-2">
                            <a href="#" aria-label="LinkedIn" className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 text-gray-700 hover:text-orange-500">
                                <FaLinkedin />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 text-gray-700 hover:text-orange-500">
                                <FaInstagram />
                            </a>
                            <a href="#" aria-label="Facebook" className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 text-gray-700 hover:text-orange-500">
                                <FaFacebook />
                            </a>
                            <a href="#" aria-label="YouTube" className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 text-gray-700 hover:text-orange-500">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p className="mb-3 md:mb-0">&copy; {new Date().getFullYear()} Booknfix. Todos os direitos reservados.</p>
                    <div className="flex gap-4">
                        <Link to="/terms" className="hover:text-orange-500 text-black no-underline">Termos e Condições</Link>
                        <Link to="/privacy" className="hover:text-orange-500 text-black no-underline">Política de Privacidade</Link>
                        <Link to="/cookies" className="hover:text-orange-500 text-black no-underline">Cookies</Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
