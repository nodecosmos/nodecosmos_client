### Workflow Notes
- Each `Workflow` has multiple `Flows`.
- Each `Flow` represents isolated process within the `Workflow`.
- Each `Flow` has multiple `FlowSteps`.
- Each `FlowStep` represents a single step within a `Flow`.

Note that in back-end we don't have `WorkflowSteps` so in front-end we have to build them
by understanding that each `WorkflowStep` contains multiple `Flows` with single `FlowStep`
that corresponds to that `WorkflowStep`.

Each Flow starting position, within the Workflow, is determined by `flow.startIndex` attribute.
