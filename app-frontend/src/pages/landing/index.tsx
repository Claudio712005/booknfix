import React from "react";
import img_background from "../../assets/background.jpg";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Divider } from "primereact/divider";
import { Chip } from "primereact/chip";
import { Carousel } from "primereact/carousel";
import Footer from "@/components/Footer";

const LandingPage: React.FC = () => {
    const { t } = useTranslation();

    const CAROUSEL_TEMPLATE = (item: {
        image: string;
        title: string;
        description: string;
    }) => {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[200px] object-cover rounded-lg shadow-md"
                />
                <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div>
                    <Button
                        label={t("landing.viewDetails")}
                        icon="pi pi-info-circle"
                        severity="warning"
                        className="mt-2"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center justify-center relative">
            <img
                src={img_background}
                alt="Background"
                className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-cover shadow-inner"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

            <div className="absolute top-0 w-full flex flex-col justify-center ">
                <div className="w-full flex-col px-4 sm:px-8 md:px-24 py-6 z-20">

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow mb-4 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:w-[46%]">
                        {t("landing.bannerText")}
                    </h1>

                    <Divider className="my-2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:w-[46%]" />

                    <Button
                        label={t("landing.registerYourService")}
                        icon="pi pi-plus"
                        severity="warning"
                        size="large"
                        className="mt-4 w-fit"
                    />
                    <div className="flex-col bg-white rounded-lg lg:px-0 md:px-4 sm:px-6 sm:mt-4 md:mt-6">

                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow mt-6 mb-5">
                            {t("landing.popularServiceCategories")}
                        </h1>
                        <div className="flex flex-wrap gap-2 mt-2 w-full justify-center">
                            <Chip label="Beleza" icon="pi pi-star" />
                            <Chip label="Manutenção" icon="pi pi-wrench" />
                            <Chip label="Limpeza" icon="pi pi-broom" />
                            <Chip label="Cuidados pessoais" icon="pi pi-heart" />
                            <Chip label="Reparos" icon="pi pi-cog" />
                            <Chip label="Serviços domésticos" icon="pi pi-home" />
                            <Chip label="Jardinagem" icon="pi pi-leaf" />
                            <Chip label="Tecnologia" icon="pi pi-desktop" />
                            <Chip label="Saúde" icon="pi pi-plus" />
                            <Chip label="Eventos" icon="pi pi-calendar" />
                            <Chip label="Educação" icon="pi pi-book" />
                            <Chip label="Transporte" icon="pi pi-car" />
                            <Chip label="Consultoria" icon="pi pi-briefcase" />
                            <Chip label="Fotografia" icon="pi pi-camera" />
                            <Chip label="Alimentação" icon="pi pi-food" />
                            <Chip label="Fitness" icon="pi pi-gym" />
                            <Chip label="Animais de estimação" icon="pi pi-paw" />
                        </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow mt-12 mb-2">
                        {t("landing.popularServicesNearYou")}
                    </h1>
                    <Carousel
                        value={[
                            {
                                image: "https://placehold.co/400",
                                title: "Serviço 1",
                                description: "Descrição do serviço 1"
                            },
                            {
                                image: "https://placehold.co/400",
                                title: "Serviço 2",
                                description: "Descrição do serviço 2"
                            },
                            {
                                image: "https://placehold.co/400",
                                title: "Serviço 3",
                                description: "Descrição do serviço 3"
                            },
                            {
                                image: "https://placehold.co/400",
                                title: "Serviço 4",
                                description: "Descrição do serviço 4"
                            },
                            {
                                image: "https://placehold.co/400",
                                title: "Serviço 5",
                                description: "Descrição do serviço 5"
                            },
                            {
                                image: "https://placehold.co/400",
                                title: "Serviço 6",
                                description: "Descrição do serviço 6"
                            }
                        ]}
                        itemTemplate={CAROUSEL_TEMPLATE}
                        numVisible={5}
                        responsiveOptions={[
                            {
                                breakpoint: '1400px',
                                numVisible: 2,
                                numScroll: 1
                            },
                            {
                                breakpoint: '1199px',
                                numVisible: 3,
                                numScroll: 1
                            },
                            {
                                breakpoint: '767px',
                                numVisible: 2,
                                numScroll: 1
                            },
                            {
                                breakpoint: '575px',
                                numVisible: 1,
                                numScroll: 1
                            }
                        ]}
                    />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
