import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { facultyService } from "@/services/facultyService";
import { EditFacultyDialog } from "./EditFacultyDialog";
import { ManageAvailabilityModal } from "./ManageAvailabilityModal";
import { Layout } from "@/components/layout/Layout";

export const FacultyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(facultyService.getFacultyById(id!));
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  if (!faculty) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Faculty not found</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  const refreshFaculty = () => {
    const updated = facultyService.getFacultyById(id!);
    if (updated) setFaculty(updated);
  };

  return (
    <Layout>
      <div className="max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {faculty.firstName} {faculty.lastName}
            </h1>
            <p className="text-muted-foreground">{faculty.subject}</p>
          </div>
        </div>

        <div className="border-b mb-6">
          <div className="flex gap-6">
            <button className="px-4 py-3 font-medium border-b-2 border-primary text-primary">
              Overview
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Basic Details</CardTitle>
              <Button variant="link" onClick={() => setShowEditDialog(true)}>
                EDIT
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Name</span>
                <span className="col-span-2">
                  {faculty.firstName} {faculty.lastName}
                </span>
              </div>
              {faculty.gender && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-muted-foreground">Gender</span>
                  <span className="col-span-2">{faculty.gender}</span>
                </div>
              )}
              {faculty.dateOfBirth && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-muted-foreground">Date of Birth</span>
                  <span className="col-span-2">{faculty.dateOfBirth}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Email</span>
                <span className="col-span-2">{faculty.email || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Mobile</span>
                <span className="col-span-2">{faculty.mobile}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Availability</CardTitle>
              <Button
                variant="link"
                onClick={() => setShowAvailabilityModal(true)}
              >
                MANAGE
              </Button>
            </CardHeader>
            <CardContent>
              {faculty.availability.length > 0 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 font-medium">
                    <span>Days</span>
                    <span>Time</span>
                  </div>
                  {faculty.availability.map((slot, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <span>{slot.days.join(", ")}</span>
                      <span>
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No availability set
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {showEditDialog && (
        <EditFacultyDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          faculty={faculty}
          onSuccess={refreshFaculty}
        />
      )}

      {showAvailabilityModal && (
        <ManageAvailabilityModal
          isOpen={showAvailabilityModal}
          onClose={() => setShowAvailabilityModal(false)}
          faculty={faculty}
          onSuccess={refreshFaculty}
        />
      )}
    </Layout>
  );
};
