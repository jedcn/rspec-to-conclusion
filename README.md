# rspec-to-conclusion

[![Circle CI](https://circleci.com/gh/jedcn/rspec-to-conclusion.svg?style=svg)](https://circleci.com/gh/jedcn/rspec-to-conclusion) [![Code Climate](https://codeclimate.com/github/jedcn/rspec-to-conclusion/badges/gpa.svg)](https://codeclimate.com/github/jedcn/rspec-to-conclusion) [![Test Coverage](https://codeclimate.com/github/jedcn/rspec-to-conclusion/badges/coverage.svg)](https://codeclimate.com/github/jedcn/rspec-to-conclusion)

Node based cli for running rspec to conclusion



## Background

Coming Soon

## Usage

If you just run `rspec` by itself, it will run all of the specs in
your `specs/` directory.

However, if any of these fail, you have to manually parse through the
output and run them again.

If you run `rspec-to-conclusion` it will run all of the specs in your
`specs/` directory, and it will also:

* Create an HTML record of the run in `rspecToConclusion-1.html`
* Create a JSON record of the run in `rspecToConclusion-1.json`
* Parse the JSON and remember passing and failing specs.
* Start another run and repeat the process above for any failed
  specs. The new files will be `rspecToConclusion-2.html` and
  `rspecToConclusion-2.json`
* It will keep repeating this process until all of the specs have
  passed or the maximum number of tries has been reached.
* Once the runs have ended, an ascii summary will be printed. An
  example:

```
| File Name and Line Number      | Result  | Tries |
| ------------------------------ | ------- | ----- |
| ./spec/flakey_spec.rb:6        | FAILURE | 2     |
| ./spec/really_flakey_spec.rb:6 | FAILURE | 2     |
| ./spec/always_pass_spec.rb:2   | PASSED  | 1     |
| ./spec/always_pass_spec.rb:6   | PASSED  | 1     |
| ./spec/flakey_spec.rb:2        | PASSED  | 1     |
| ./spec/really_flakey_spec.rb:2 | PASSED  | 1     |
| ./spec/always_fail_spec.rb:2   | PENDING | 0     |
| ./spec/always_fail_spec.rb:6   | PENDING | 0     |
```

### Options

You can focus the number of specs by supplying a parameter:

#### target specific specs

    rspec-to-conclusion specs/for/a/feature

#### --tries

By default, the maximum number of tries is 5. You can change this to
be more or less:

    rspec-to-conclusion --tries 10

#### ENV variables

Any environment variables will be passed onto rspec:

    NOT_ON_MY_WATCH=true rspec-to-conclusion

## Installation

This package has not yet been published.

It should be publish shortly. If you'd like to try to use a very early
version of it, you could:

    git clone https://github.com/jedcn/rspec-to-conclusion.git
    git checkout -b in-progress origin/in-progress
    npm link

### Miscellaneous

`rspec` must be in your `PATH`.
