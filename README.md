# rspec-to-conclusion

[![Circle CI](https://circleci.com/gh/jedcn/rspec-to-conclusion.svg?style=svg)](https://circleci.com/gh/jedcn/rspec-to-conclusion) [![Code Climate](https://codeclimate.com/github/jedcn/rspec-to-conclusion/badges/gpa.svg)](https://codeclimate.com/github/jedcn/rspec-to-conclusion) [![Test Coverage](https://codeclimate.com/github/jedcn/rspec-to-conclusion/badges/coverage.svg)](https://codeclimate.com/github/jedcn/rspec-to-conclusion)

A node based command for running rspec to conclusion

## Background

One time, myself, and my friends-- we found ourselves as JavaScript
engineers, building JavaScript products, writing JavaScript Unit
Tests.. and it was pretty cool.

But our integration tests? The tests that "drove a browser?" Those
tests were written in Ruby.

Ruby?

Ruby!

Ruby.

And RSpec + Capybara.

I :heart: Ruby. And I :blue_heart: RSpec.

But.. the big bummer was that the integration tests failed
sporadically and a full test run took as long as 45 minutes.

And.. for one reason or another, we couldn't fix the tests directly or
delete the problematic ones.

It was a weird time.

And so, for a [lark][exaltation-of-larks], I wanted to see what would
happen if we wrote a small utility that managed rspec runs with
JavaScript: :money_with_wings:.

[exaltation-of-larks]: http://www.amazon.com/An-Exaltation-Larks-Ultimate-Edition/dp/0140170960

## Usage

If you just run `rspec` by itself, it will run all of the specs in
your `specs/` directory.

However, if any of these fail, you have to manually parse through the
output to see which ones failed, and then run them again.

If you run `rspec-to-conclusion` it will run all of the specs in your
`specs/` directory, and it will also:

* Create an HTML record of the run in `rspecToConclusion-1.html`, and
  create a JSON record of the run in `rspecToConclusion-1.json`
* Parse the JSON and make note passing and failing specs.
* If you had any failures, it will start another rspec run and repeat
  the process above but for only the failed specs.
* HTML and JSON records of what happened during the second run will be
  created at: `rspecToConclusion-2.html` and
  `rspecToConclusion-2.json`
* `rspec-to-conclusion` will keep repeating this process until all of
  the specs have passed (:thumbsup:) *or* the maximum number of tries
  has been reached but you still have failures (:thumbsdown:).
* Once the runs have ended, an ascii summary will be printed. An
  example:

```
| File Name and Line Number      | Result  | Tries |
| ------------------------------ | ------- | ----- |
| ./spec/always_fail_spec.rb:2   | PENDING | 0     |
| ./spec/always_fail_spec.rb:6   | PENDING | 0     |
| ./spec/always_pass_spec.rb:2   | PASSED  | 1     |
| ./spec/always_pass_spec.rb:6   | PASSED  | 1     |
| ./spec/flakey_spec.rb:2        | PASSED  | 1     |
| ./spec/really_flakey_spec.rb:2 | PASSED  | 1     |
| ./spec/flakey_spec.rb:6        | FAILURE | 2     |
| ./spec/really_flakey_spec.rb:6 | FAILURE | 2     |
```

Finally, the status code returned by rspec-to-conclusion will be the
number of failing specs. So-- if they all passed-- it'll be zero and
signal success.

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

You can get `rspec-to-conclusion` by typing:

    npm install -g rspec-to-conclusion

### Miscellaneous

`rspec` must be in your `PATH`.
