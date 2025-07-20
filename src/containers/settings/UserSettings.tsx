'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { selectedUser } from '@/reducers/userSlice';
import { useAppSelector } from '@/store/hooks';
import { CopyToClipboard, PageHeading } from '@/components/common';
import { Mail, Package, ShoppingCart, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const UserSettings = () => {
  const user = useAppSelector(selectedUser);
  const { setTheme } = useTheme();

  function capitalize(value: string) {
    return value[0]?.toUpperCase() + value?.slice(1);
  }
  return (
    <div className="">
      <PageHeading
        title="User Settings"
        subTitle="Manage your account settings and preferences"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-5 w-full rounded-lg border-gray-400 shadow">
          <CardHeader>
            <PageHeading
              title={
                <div className="flex items-center gap-1">
                  <User className="size-5" />
                  <h1 className="text-xl font-semibold">Profile Information</h1>
                </div>
              }
              subTitle={
                <p className="text-base text-gray-500">
                  Your personal information and account details
                </p>
              }
              className="pt-0"
            />
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-5">
              <div className="relative h-36 w-36 overflow-hidden rounded-[999px] border border-gray-200">
                <Image
                  alt={user?.username}
                  fill
                  src={'/placeholder.png'}
                  className="object-cover"
                />
              </div>

              <div className="">
                <h6 className="text-3xl font-semibold">
                  {capitalize(user.name)}
                </h6>
                <p className="text-base font-medium text-gray-600">
                  @{user.username}
                </p>

                {/* <div className="mt-10">
                  <p className="pb-2">Email</p>
                  <div className="rounded-lg border border-gray-400 p-1 px-6 text-gray-600">
                    {user.email}
                    <CopyToClipboard text={user?.email} />
                  </div>
                </div> */}

                {/* <div className="mt-7 w-full">
                  <Card className="w-full rounded-lg border-gray-400 shadow">
                    <CardHeader>
                      <CardTitle className="text-xl font-medium">
                        Order details
                      </CardTitle>
                      <CardDescription className="">
                        Orders summary
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <div className="relative flex w-[100px] flex-col gap-1">
                        <p className="">Total Orders</p>
                        <h6 className="self-end px-2 text-3xl font-medium">
                          12
                        </h6>
                      </div>
                      <div className="relative flex w-[100px] flex-col gap-1">
                        <p className="">Total Orders</p>
                        <h6 className="self-end px-2 text-3xl font-medium">
                          12
                        </h6>
                      </div>
                      <div className="relative flex w-[100px] flex-col gap-1">
                        <p className="">Total Orders</p>
                        <h6 className="self-end px-2 text-3xl font-medium">
                          12
                        </h6>
                      </div>
                    </CardContent>
                  </Card>
                </div> */}
              </div>
            </div>

            <Separator className="my-4 bg-gray-300" />

            <div className="grid gap-4 pt-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="flex-1 border border-gray-300"
                  />
                  <CopyToClipboard
                    text={user.email}
                    className="border border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={user.username}
                  readOnly
                  className="flex-1 border border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2 flex w-full flex-col gap-4">
          <Card className="w-full rounded-lg border-gray-400 shadow">
            <CardHeader>
              <p className="text-base text-gray-500">Account Overview</p>

              <div className="flex items-center justify-between">
                <p className="black font-medium">Member since</p>
                <p className="black font-medium">Jan 2024</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="black font-medium">Theme</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>

          <Card className="w-full rounded-lg border-gray-400 shadow">
            <CardHeader>
              <p className="text-base text-gray-500">Security</p>

              <Button variant="elevated" className="m-2">
                Change Password
              </Button>
            </CardHeader>
          </Card>
        </div>

        <Card className="col-span-7 w-full rounded-lg border-gray-400 shadow">
          <CardHeader>
            <PageHeading
              title={
                <div className="flex items-center gap-1">
                  <User className="size-5" />
                  <h1 className="text-xl font-semibold">Order Statistics</h1>
                </div>
              }
              subTitle={
                <p className="text-base text-gray-500">
                  Overview of your order history and activity
                </p>
              }
              className="pt-0"
            />
          </CardHeader>
          <CardContent className="mt-0 pt-0">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Products
                  </p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Pending
                  </p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Recent Activity</h4>
                <p className="text-muted-foreground text-sm">
                  View all orders list
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/library" prefetch>View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
