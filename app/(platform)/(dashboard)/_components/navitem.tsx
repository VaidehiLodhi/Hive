"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, Layout, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {

  const router = useRouter();
  const pathname = usePathname();

  const onClick = (href:string) => {
    router.push(href);
  }

  const routes = [
    {
      label : "Boards",
      icon : <Layout className="w-4 h-4 mr-2"/>,
      href : `/organization/${organization.id}`,
    },
    {
      label : "Activity",
      icon : <Activity className="w-4 h-4 mr-2"/>,
      href : `/organization/${organization.id}/activity`,
    },
    {
      label : "Settings",
      icon : <Settings className="w-4 h-4 mr-2"/>,
      href : `/organization/${organization.id}/settings`,
    },
    
  ]

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center p-1.5 gap-x-2 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-yellow-400/20 text-yellow-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm ">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 twxt-neutral-700">
        {routes.map((route)=>(
          <Button
          key={route.href}
          size="sm"
          onClick={() => onClick(route.href)}
          className={cn(
            "w-full font-normal justify-size pl-10 mb-1",
          pathname === route.href && "bg-yellow-500/10 text-yellow-600")}
          variant="ghost">
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute"/>
      </div>
      <Skeleton className="h-10 w-full"/>
    </div>
  )
}