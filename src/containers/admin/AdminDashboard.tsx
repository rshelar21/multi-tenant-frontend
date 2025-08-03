import React from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  DollarSign,
  LucideProps,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getAnalyticsDataAPI, getRevenueAPI } from '@/api/analytics';
import { formatCurrency } from '@/utils';

const LoadingIndicator = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...new Array(3)].map((i) => (
          <Card className="relative overflow-hidden" key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[150px] bg-gray-200 dark:bg-gray-50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-50" />
              </div>

              <p className="text-muted-foreground mt-1 text-xs">
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-50" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest customer orders and their status
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full bg-gray-200 dark:bg-gray-50" />
              <Skeleton className="h-12 w-full bg-gray-200 dark:bg-gray-50" />
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full bg-gray-200 dark:bg-gray-50" />
              <Skeleton className="h-12 w-full bg-gray-200 dark:bg-gray-50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({
  title,
  description,
  value,
  Icon,
}: {
  title: string;
  description: string;
  value: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      </CardContent>
    </Card>
  );
};

export const AdminDashboard = ({ isSuperAdmin }: { isSuperAdmin: boolean }) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['admin-analytics', isSuperAdmin],
        queryFn: getAnalyticsDataAPI,
      },
      {
        queryKey: ['admin-revenue', isSuperAdmin],
        queryFn: getRevenueAPI,
      },
    ],
  });

  const isLoading = results[0].isLoading || results[1].isLoading;
  const data = results[0]?.data;
  const revenue = results[1]?.data;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isSuperAdmin && (
          <StatsCard
            title="Total Users"
            description="Active users this month"
            value={`${data?.totalUsers}`}
            Icon={Users}
          />
        )}
        <StatsCard
          title="Total Products"
          description="Products in inventory"
          value={`${data?.totalProducts}`}
          Icon={Package}
        />
        <StatsCard
          title="Total Orders"
          description="Orders this month"
          value={`${data?.count}`}
          Icon={ShoppingCart}
        />
        <StatsCard
          title="Total Revenue"
          description="Revenue this month"
          value={formatCurrency(Number(revenue))}
          Icon={DollarSign}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest customer orders and their status
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.orders?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium">{order?.user?.name}</p>
                      <p className="text-muted-foreground text-sm">
                        Order {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={'default'}>Completed</Badge>
                    {/* <p className="font-medium">{order.product.}</p> */}
                  </div>
                </div>
              ))}
              {data?.orders.length === 0 && (
                <div className="">
                  <h5 className="text-center text-lg font-semibold text-gray-300">
                    Order History is Empty
                  </h5>
                  <p className="text-center text-sm font-normal text-gray-400">
                    No orders found for your account
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.topProducts?.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {product?.product_name}
                    </p>
                    <p className="text-sm font-medium">
                      $
                      {Number(product?.product_price) *
                        Number(product?.order_count)}
                    </p>
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>{product?.order_count} sales</span>
                    <span>
                      {Math.round(
                        (Number(product?.order_count) / data.count) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(Number(product?.order_count) / data.count) * 100}
                    className="h-2"
                  />
                </div>
              ))}
              {data?.orders.length === 0 && (
                <div className="">
                  <h5 className="text-center text-lg font-semibold text-gray-300">
                    Top Products Not Found
                  </h5>
                  <p className="text-center text-sm font-normal text-gray-400">
                    There are currently no products with sales data
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
