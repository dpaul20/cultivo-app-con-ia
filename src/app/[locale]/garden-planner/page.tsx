import SiteHeader from "@/components/layout/site-header-simple";
import SiteFooter from "@/components/layout/site-footer";
import GardenPlannerApp from "@/components/garden-planner/garden-planner-app";
import { useTranslations } from "next-intl";

export default function GardenPlannerPage() {
  const t = useTranslations("gardenPlanner");
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {t("title")}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <GardenPlannerApp />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
