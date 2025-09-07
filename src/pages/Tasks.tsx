import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, CheckCircle2, Calendar, AlertCircle, Clock, Trophy, Trash2 } from "lucide-react";
import { mockTasks, mockChallenges } from "@/lib/mockData";
import type { Task } from "@/lib/types";
import { toast } from "sonner";

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const statusLabels = {
  today: "Today",
  "this-week": "This Week", 
  later: "Later",
  completed: "Completed",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    status: "today" as const,
    dueDate: "",
    linkedChallengeId: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: "completed" as const, completedAt: new Date() }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    toast.success(`Task completed: ${task?.title}`, {
      description: "Great job! Keep up the momentum! 🎉",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success("Task deleted");
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const task: Task = {
      id: `task-${Date.now()}`,
      userId: "user-1",
      title: newTask.title,
      description: newTask.description || undefined,
      priority: newTask.priority,
      status: newTask.status,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      linkedChallengeId: newTask.linkedChallengeId || undefined,
      createdAt: new Date(),
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      status: "today", 
      dueDate: "",
      linkedChallengeId: "",
    });
    setIsDialogOpen(false);
    toast.success("Task created successfully!");
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const tasksByStatus = {
    today: tasks.filter(t => t.status === "today"),
    "this-week": tasks.filter(t => t.status === "this-week"),
    later: tasks.filter(t => t.status === "later"),
    completed: tasks.filter(t => t.status === "completed"),
  };

  const completedToday = tasks.filter(t => 
    t.status === "completed" && 
    t.completedAt && 
    new Date(t.completedAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-playfair font-bold">Wellness Tasks</h1>
          <p className="text-muted-foreground">
            Organize and track your wellness activities and goals.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Morning meditation"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional details..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={newTask.priority} onValueChange={(value) => 
                    setNewTask(prev => ({ ...prev, priority: value as any }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={newTask.status} onValueChange={(value) => 
                    setNewTask(prev => ({ ...prev, status: value as any }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="later">Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Due Date (Optional)</label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Linked Challenge</label>
                <Select value={newTask.linkedChallengeId} onValueChange={(value) => 
                  setNewTask(prev => ({ ...prev, linkedChallengeId: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a challenge..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No challenge</SelectItem>
                    {mockChallenges.map((challenge) => (
                      <SelectItem key={challenge.id} value={challenge.id}>
                        {challenge.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateTask} className="flex-1">
                  Create Task
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{completedToday}</p>
            <p className="text-sm text-muted-foreground">Completed Today</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{tasksByStatus.today.length}</p>
            <p className="text-sm text-muted-foreground">Due Today</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{tasksByStatus["this-week"].length}</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{tasksByStatus.completed.length}</p>
            <p className="text-sm text-muted-foreground">Total Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-6 lg:grid-cols-4">
        {(["today", "this-week", "later", "completed"] as const).map((status) => (
          <Card key={status} className="wellness-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                {statusLabels[status]}
                <Badge variant="outline">
                  {tasksByStatus[status].length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasksByStatus[status].length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No tasks</p>
                </div>
              ) : (
                tasksByStatus[status].map((task) => {
                  const linkedChallenge = task.linkedChallengeId 
                    ? mockChallenges.find(c => c.id === task.linkedChallengeId)
                    : null;

                  return (
                    <Card key={task.id} className="p-3 hover:shadow-sm transition-shadow">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                          <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </Badge>
                        </div>
                        
                        {task.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        {linkedChallenge && (
                          <div className="flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary">{linkedChallenge.title}</span>
                          </div>
                        )}

                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-1 pt-1">
                          {status !== "completed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs flex-1"
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}