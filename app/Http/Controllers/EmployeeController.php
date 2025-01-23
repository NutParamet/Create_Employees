<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Response;
use Inertia\Inertia;
use Symfony\Contracts\Service\Attribute\Required;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search', '');

        $sortField = $request->input('sort', 'emp_no');
        $sortOrder = $request->input('order', 'asc');

        // Build the query
        $employees = DB::table('employees')
        ->where('first_name', 'like', '%' . $query . '%')
        ->orWhere('last_name', 'like', '%' . $query . '%')
        ->orWhere('emp_no', 'like', '%' . $query . '%')
        ->orderBy($sortField, $sortOrder)
        ->paginate(10);

        return Inertia::render('Employee/index', [
            'employees' => $employees,
            'query' => $query,
            'sortField' => $sortField,
            'sortOrder' => $sortOrder,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();
        return inertia('Employee/Create', ['departments' => $departments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'first_name' => 'required|string|max:14',
            'last_name' => 'required|string|max:16',
            'gender' => 'required|in:M,F',
            'birth_date' => 'required|date',
            'hire_date' => 'required|date',
            'dept_no' => 'required|exists:departments,dept_no',
            'images' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0;
        $newEmpNo = $latestEmpNo + 1;

        $imagesPath = null;
        if ($request->hasFile('images')) {
            $imagesPath = $request->file('images')->store('employees', 'public');
            $validated['images'] = $imagesPath;
        }

        DB::transaction(function () use ($validated, $newEmpNo, $request, $imagesPath) {

            DB::table('employees')->insert([
                'emp_no' => $newEmpNo,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'gender' => $validated['gender'],
                'birth_date' => $validated['birth_date'],
                'hire_date' => $validated['hire_date'],
                'images' => $validated['images'] ?? null,
            ]);

            DB::table('dept_emp')->insert([
                'emp_no' => $newEmpNo,
                'dept_no' => $validated['dept_no'],
                'from_date' => $validated['hire_date'],
                'to_date' => '9999-01-01'
            ]);
        });

        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');
    } catch (\Exception $e) {
        return back()->with('error', 'Failed to create employee. Please try again.');
    }
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
