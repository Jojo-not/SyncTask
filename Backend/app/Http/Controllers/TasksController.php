<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TasksController extends Controller
{
   public function index(Request $request)
    {
        return response()->json($request->user()->tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in_progress,completed',
            'priority' => 'in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $task = $request->user()->tasks()->create($validated);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in_progress,completed',
            'priority' => 'in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    public function destroy(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }

    public function getUserTasks($userId)
    {
        $user = User::findOrFail($userId);
        $tasks = $user->tasks()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed'
        ]);

        $task->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Task status updated successfully',
            'data' => $task
        ]);
    }

    public function getTaskStats(Request $request)
    {
        $user = $request->user();
        
        $stats = [
            'total' => $user->tasks()->count(),
            'completed' => $user->tasks()->where('status', 'completed')->count(),
            'in_progress' => $user->tasks()->where('status', 'in_progress')->count(),
            'pending' => $user->tasks()->where('status', 'pending')->count(),
        ];

        // Calculate completion percentage
        $stats['completion_rate'] = $stats['total'] > 0 
            ? round(($stats['completed'] / $stats['total']) * 100, 2) 
            : 0;

        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }

    // Alternative method using a single query for better performance
    public function getTaskStatsSingleQuery(Request $request)
    {
        $user = $request->user();
        
        $stats = $user->tasks()
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();

        $response = [
            'total' => array_sum($stats),
            'completed' => $stats['completed'] ?? 0,
            'in_progress' => $stats['in_progress'] ?? 0,
            'pending' => $stats['pending'] ?? 0,
        ];

        $response['completion_rate'] = $response['total'] > 0 
            ? round(($response['completed'] / $response['total']) * 100, 2) 
            : 0;

        return response()->json([
            'status' => 'success',
            'data' => $response
        ]);
    }

    public function getTasksByPriority(Request $request, $priority = null)
    {
        $query = $request->user()->tasks();
        
        if ($priority) {
            $query->where('priority', $priority);
        } else {
            $query->orderBy('priority', 'desc');
        }
        
        $tasks = $query->get()->groupBy('priority');
        
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    public function getTasksByStatus(Request $request, $status = null)
    {
        $query = $request->user()->tasks();
        
        if ($status) {
            $query->where('status', $status);
        } else {
            $query->orderBy('status');
        }
        
        $tasks = $query->get()->groupBy('status');
        
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    public function getTasksDueToday(Request $request)
    {
        $today = now()->format('Y-m-d');
        
        $tasks = $request->user()->tasks()
            ->whereDate('due_date', $today)
            ->orderBy('priority', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    public function getOverdueTasks(Request $request)
    {
        $today = now()->format('Y-m-d');
        
        $tasks = $request->user()->tasks()
            ->whereDate('due_date', '<', $today)
            ->where('status', '!=', 'completed')
            ->orderBy('due_date')
            ->orderBy('priority', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $tasks,
            'meta' => [
                'total_overdue' => $tasks->count(),
                'oldest_due_date' => $tasks->min('due_date'),
                'priorities' => $tasks->groupBy('priority')->map->count()
            ]
        ]);
    }
}
