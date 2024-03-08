"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updatePageAction } from "@/lib/actions/pages";
import { Page } from "@/lib/db/schema/pages";
import Link from "next/link";
import { toast } from "sonner";
 
export default function TogglePublic({
  isSubscribed,
  page,
}: {
  isSubscribed: boolean;
  page: Page;
}) {
  const pageLink = "http://localhost:3000/share/" + page.slug;
  return (
    <div className="relative">
      {isSubscribed ? null : (
        <div className="absolute w-full bg-white h-full top-0 right-0 z-50 opacity-90 flex items-center justify-center flex-col">
          <p className="font-bold text-lg select-none mb-2">
            You need to subscribe to share this page
          </p>
          <Button asChild variant={"secondary"}>
            <Link href="/account/billing">Subscribe</Link>
          </Button>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Share this page</CardTitle>
          <CardDescription>
            Anyone with the link can view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {page.public ? (
            <div className="flex space-x-2">
              <Input value={pageLink} readOnly disabled={!isSubscribed} />
              <Button
                variant="secondary"
                className="shrink-0"
                disabled={!isSubscribed}
                onClick={() => {
                  navigator.clipboard.writeText(pageLink);
                  toast.success("Copied to clipboard");
                }}
              >
                Copy Link
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={async () =>
                  await updatePageAction({ ...page, public: true })
                }
              >
                Make public
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}