import { useTranslations } from "next-intl";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CropAssistant from "@/components/crop-assistant";
import PopularCrops from "@/components/popular-crops";
import SiteHeader from "@/components/layout/site-header-simple";
import SiteFooter from "@/components/layout/site-footer";

export default function HomePage({ params }: Readonly<PageProps<"/[locale]">>) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("HomePage");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t("hero.title")}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t("hero.subtitle")}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t("hero.searchPlaceholder")}
                      className="w-full pl-8"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {t("hero.findCompanions")}
                  </Button>
                </div>
              </div>
              <Image
                alt="Garden with companion planting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop"
                width={800}
                height={450}
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {t("howItWorks.title")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  {t("howItWorks.subtitle")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{t("howItWorks.step1.title")}</CardTitle>
                  <CardDescription>
                    {t("howItWorks.step1.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Select crops illustration"
                    className="aspect-video w-full rounded-lg object-cover"
                    src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop"
                    width={800}
                    height={450}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("howItWorks.step2.title")}</CardTitle>
                  <CardDescription>
                    {t("howItWorks.step2.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="AI recommendations illustration"
                    className="aspect-video w-full rounded-lg object-cover"
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
                    width={800}
                    height={450}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("howItWorks.step3.title")}</CardTitle>
                  <CardDescription>
                    {t("howItWorks.step3.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Garden planner illustration"
                    className="aspect-video w-full rounded-lg object-cover"
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop"
                    width={800}
                    height={450}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <PopularCrops />
              <CropAssistant />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
