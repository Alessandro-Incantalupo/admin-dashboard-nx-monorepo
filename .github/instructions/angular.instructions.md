---
applyTo: '**'
---

# ✅ Modern Angular Quick Reference (No Comments)

## Preferred Syntax

- `@if()`
- `@for()`
- `@defer()`
- `inject(SomeService)`
- `provideX()` in `app.config.ts`
- `inject(Router)`
- `readonly mySignal = signal<Type>(initialValue)`
- `readonly myInput = input<Type>()`
- `readonly myOutput = output<Type>()`
- `readonly myTable = viewChild<Table>(Table)`
- Use SignalStore

## Replace `switch` with Map or Object Map

```ts
const statusMessages = {
  success: 'Operation successful',
  error: 'Something went wrong',
} as const;

const message = statusMessages[status] ?? 'Unknown status';
```

```ts
const statusMap = new Map([
  ['success', 'Operation successful'],
  ['error', 'Something went wrong'],
]);

const message = statusMap.get(status) ?? 'Unknown status';
```

## Prefer Object Destructuring

Instead of:

```ts
const obj = { a: 1, b: 2 };
delete obj.a;
```

Use:

```ts
const obj = { a: 1, b: 2 };
const { a, ...rest } = obj;
// rest = { b: 2 }
```

## Prefer `as const` over `enum`

```ts
const STATUS = {
  success: 'success',
  error: 'error',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
```

You are in an nx workspace using Nx 21.1.1 and pnpm as the package manager.

You have access to the Nx MCP server and the tools it provides. Use them. Follow these guidelines in order to best help the user:

# General Guidelines

- When answering questions, use the nx_workspace tool first to gain an understanding of the workspace architecture
- For questions around nx configuration, best practices or if you're unsure, use the nx_docs tool to get relevant, up-to-date docs!! Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the 'nx_workspace' tool to get any errors
- To help answer questions about the workspace structure or simply help with demonstrating how tasks depend on each other, use the 'nx_visualize_graph' tool

# Generation Guidelines

If the user wants to generate something, use the following flow:

- learn about the nx workspace and any specifics the user needs by using the 'nx_workspace' tool and the 'nx_project_details' tool if applicable
- get the available generators using the 'nx_generators' tool
- decide which generator to use. If no generators seem relevant, check the 'nx_available_plugins' tool to see if the user could install a plugin to help them
- get generator details using the 'nx_generator_schema' tool
- you may use the 'nx_docs' tool to learn more about a specific generator or technology if you're unsure
- decide which options to provide in order to best complete the user's request. Don't make any assumptions and keep the options minimalistic
- open the generator UI using the 'nx_open_generate_ui' tool
- wait for the user to finish the generator
- read the generator log file using the 'nx_read_generator_log' tool
- use the information provided in the log file to answer the user's question or continue with what they were doing

# Running Tasks Guidelines

If the user wants help with tasks or commands (which include keywords like "test", "build", "lint", or other similar actions), use the following flow:

- Use the 'nx_current_running_tasks_details' tool to get the list of tasks (this can include tasks that were completed, stopped or failed).
- If there are any tasks, ask the user if they would like help with a specific task then use the 'nx_current_running_task_output' tool to get the terminal output for that task/command
- Use the terminal output from 'nx_current_running_task_output' to see what's wrong and help the user fix their problem. Use the appropriate tools if necessary
- If the user would like to rerun the task or command, always use `nx run <taskId>` to rerun in the terminal. This will ensure that the task will run in the nx context and will be run the same way it originally executed
- If the task was marked as "continuous" do not offer to rerun the task. This task is already running and the user can see the output in the terminal. You can use 'nx_current_running_task_output' to get the output of the task to verify the output.
