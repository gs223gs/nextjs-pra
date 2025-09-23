import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function PublichHeder() {
  const handleSearch = async (formData: FormData) => {
    "use server";
    const query = formData.get("query") as string;
    redirect(`/posts?query=${query}`);
  };

  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-aute px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink asChild>home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/posts">
                  <NavigationMenuLink asChild>Posts</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <form action={handleSearch}>
              <Input type="text" name="query" placeholder="Search" />
            </form>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
