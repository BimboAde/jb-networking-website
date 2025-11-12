import { type Dict, getT } from "@/lib/i18n-server";
import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { jotformUrls } from "@/data/images";

export const GuaranteeDetails = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, "solutions_credit.guarantee");
  const items = ["noResults", "days", "written"] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-gold text-white px-6 py-3 rounded-full font-bold text-lg mb-6">
            {t("badge")}
          </div>
          <Heading level={2} className="mb-6 text-brand-green">
            {t("title")}
          </Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {items.map((k) => (
            <div
              key={k}
              className={`bg-brand-gray rounded-xl p-8 text-center ${
                k === "days" ? "border-2 border-brand-gold relative" : ""
              }`}
            >
              {k === "days" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">
                  {t("mostPopular")}
                </div>
              )}
              <div
                className={`w-16 h-16 ${
                  k === "written" ? "bg-brand-navy" : "bg-brand-green"
                } rounded-full mx-auto mb-6`}
              />
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">
                {t(`${k}.title`)}
              </h3>
              <p className="text-gray-600 mb-4">{t(`${k}.text`)}</p>
              <div className="text-brand-green font-semibold">
                {t(`${k}.footer`)}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-2xl p-8 text-white text-center">
          <Heading level={3} className="mb-4">
            {t("cta.title")}
          </Heading>
          <p className="text-green-100 mb-6">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold"
              href={jotformUrls.individualCreditDebtJotformUrl}
              target="_blank"
            >
              {t("cta.button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
