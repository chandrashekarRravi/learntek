import { Layout } from "@/components/layout/Layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockNotifications } from "@/data/mockData";

export const NotificationsPage = () => {
  const unreadNotifications = mockNotifications.filter((n) => !n.isRead);
  const olderNotifications = mockNotifications.filter((n) => n.isRead);

  return (
    <Layout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">NOTIFICATIONS</h1>

        <div className="space-y-8">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">
              Unread Notifications ({unreadNotifications.length})
            </h2>
            <div className="space-y-4">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {notification.from
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">
                      {notification.from} ({notification.fromRole}) messaged to{" "}
                      {notification.to} ({notification.toRole})
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.timestamp} | {notification.courseCode}
                    </p>
                    <p className="text-sm mt-2">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Older Notifications</h2>
            <div className="space-y-4">
              {olderNotifications.map((notification) => (
                <div key={notification.id} className="flex gap-4 p-4 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {notification.from
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">
                      {notification.from} ({notification.fromRole}) messaged to{" "}
                      {notification.to} ({notification.toRole})
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.timestamp} | {notification.courseCode}
                    </p>
                    <p className="text-sm mt-2 text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
