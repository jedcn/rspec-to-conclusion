
# rspec-to-conclusion

## Data Structures

This is a small project, and there are only two JSON structures to
understand.

One structure, referred to as "Results JSON" comes explicitly from
running RSpec.

The other structure, referred to as "Summary JSON" is built from
"Results JSON," and serves as a "running summary" of several results.

## "Results JSON"

RSpec can report on a run with a JSON formatter.

The result JSON has three important properties: `examples`, `summary`,
and `summary_line`.

#### `examples`

`examples` is an array of objects, where each object describes the
result of running rspec.

```json
{
  "examples": [
    {
      "description": "some basic info",
      "full_description": "some more info",
      "status": "pending",
      "file_path": "./spec/basic_spec.rb",
      "line_number": 2,
      "run_time": 0.000031
    },
    {
      "description": "some other basic info",
      "full_description": "some other more info",
      "status": "passed",
      "file_path": "./spec/basic_spec.rb",
      "line_number": 6,
      "run_time": 0.000005
    }
  ]
}
```

#### `summary`

`summary` is a object with keys `duration`, `example_count`,
`failure_count`, and `pending_count`:

```json
  "summary": {
    "duration": 0.002386,
    "example_count": 8,
    "failure_count": 3,
    "pending_count": 2
  }
```

#### `summary_line`

`summary_line` is a single String with text like `"8 examples, 3 failures, 2 pending"`

```json
{
  "summary_line": "8 examples, 3 failures, 2 pending"
}
```

## "Summary JSON"

"Summary JSON" has an `examples` property, a list of specs that have
not yet passed in `failingSpecs`, and the most recent `summaryLine`.

### `examples`

`examples` is a map keyed by the the file and line number of each
example. The values in this map are almost identical to values in the
list of `examples` from "Results JSON" except that the "passed"
examples have an additional property named "successfulOnTry" which
indicates which run they were successful on.

```json
{
  "examples": {
    "./spec/basic_spec.rb:2": {
      "description": "some basic info",
      "full_description": "some more info",
      "status": "failed",
      "file_path": "./spec/basic_spec.rb",
      "line_number": 2,
      "run_time": 0.000031
    },
    "./spec/basic_spec.rb:6": {
      "description": "some other basic info",
      "full_description": "some other more info",
      "status": "passed",
      "file_path": "./spec/basic_spec.rb",
      "line_number": 6,
      "run_time": 0.000005,
      "successfulOnTry": 2
    }
  }
}
```

#### `failingSpecs`

`failingSpecs` is an array of Strings where each String is a spec that
failed and could be retried:

```json
{
  "failingSpecs": [ "./spec/basic_spec.rb:2" ]
}
```

#### `summaryLine`

The `summaryLine` property has the same value as the `summary_line`
from "Results JSON."

```json
{
  "summaryLine": "8 examples, 3 failures, 2 pending"
}
```
