import { type Dict, getT } from "@/lib/i18n-server";
import { Heading } from "../atoms/Heading";
import Image from "next/image";
import { getImageByLocation } from "@/lib/media";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { images } from "@/data/images";
import { Button } from "../atoms/Button";

export const CommunityImpact = async ({
  dict,
  lang,
  bookLink,
}: {
  dict: Dict;
  lang: string;
  bookLink?: string;
}) => {
  const t = getT(dict, "about_page.community");
  const aboutImg = await getImageByLocation("about", "about-section");
  const discountImg = await getImageByLocation("about", "discount-section");
  const programs = [0, 1, 2, 3, 4]
    .map((i) => t(`programs.${i}`))
    .filter((v) => typeof v === "string") as string[];
  const withLang = (path: string) =>
    `/${lang}${path.startsWith("/") ? path : "/" + path}`.replace(/\/+$/, "/");
  const bookHref = bookLink || withLang("/consultation");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">
            {t("title")}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <div className="h-80 overflow-hidden rounded-2xl relative">
              <Image
                src={
                  discountImg?.image_url ||
                  images.aboutPageImage2.src ||
                  "/jblogo.png"
                }
                alt={
                  aboutImg?.image_alt ||
                  images.aboutPageImage2.alt ||
                  "Community"
                }
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-brand-gray rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-brand-green mb-6 font-poppins">
                {t("programsTitle")}
              </h3>
              <div className="space-y-4">
                {programs.map((label, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-brand-green" />
                    <span className="text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-poppins">
                {t("reportTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {t(`reportStats.${i}.value`)}
                    </div>
                    <div className="text-sm text-green-100">
                      {t(`reportStats.${i}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* {discountImg?.image_url && (
              <div className="h-48 overflow-hidden rounded-xl relative">
                <Image src={discountImg.image_url} alt={discountImg.image_alt || images.aboutPageImage2.alt || 'Community'} fill className="object-cover" />
              </div>
            )} */}
          </div>
        </div>
        <div className="bg-brand-navy rounded-xl p-6 text-white text-center flex flex-col items-center justify-center">
          <h4 className="text-lg font-bold mb-3">{t("involved.title")}</h4>
          <p className="text-blue-100 mb-4">{t("involved.text")}</p>
          <Button
            variant="secondary"
            className="bg-white text-brand-green px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            href={bookHref}
          >
            {t("involved.button")}
          </Button>
        </div>
      </div>
    </section>
  );
};
