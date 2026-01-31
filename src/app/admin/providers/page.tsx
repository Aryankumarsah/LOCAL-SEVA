import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const providers = [
  {
    id: '1',
    name: 'John Doe',
    service: 'Plumber',
    location: 'New York, NY',
    rating: 4.8,
    status: 'Pending',
    avatar: 'https://picsum.photos/seed/p1/40/40',
  },
  {
    id: '2',
    name: 'Jane Smith',
    service: 'Electrician',
    location: 'Los Angeles, CA',
    rating: 4.9,
    status: 'Approved',
    avatar: 'https://picsum.photos/seed/p2/40/40',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    service: 'Cleaner',
    location: 'Chicago, IL',
    rating: 4.5,
    status: 'Pending',
    avatar: 'https://picsum.photos/seed/p3/40/40',
  },
  {
    id: '4',
    name: 'Emily Davis',
    service: 'Mechanic',
    location: 'Houston, TX',
    rating: 4.7,
    status: 'Rejected',
    avatar: 'https://picsum.photos/seed/p4/40/40',
  },
];

export default function AdminProvidersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Provider Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={provider.avatar} data-ai-hint="person face" />
                      <AvatarFallback>
                        {provider.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                </TableCell>
                <TableCell>{provider.service}</TableCell>
                <TableCell>{provider.location}</TableCell>
                <TableCell className="text-center">{provider.rating}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      provider.status === 'Approved'
                        ? 'default'
                        : provider.status === 'Pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className={provider.status === 'Approved' ? 'bg-green-500/20 text-green-700' : ''}
                  >
                    {provider.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {provider.status === 'Pending' && (
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
