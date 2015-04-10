# Upcoming

## Handle situation where invalid specs are supplied:

    rspec-to-conclusion something-that-doesn't-exist

It presently creates an empty JSON file, tries to parse it, and pukes like:

```
rspec-to-conclusion DoesNotExist
Run #1..
/opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/configuration.rb:1226:in `load': cannot load such file -- /projects/flakey-rspec-tests/DoesNotExist (LoadError)
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/configuration.rb:1226:in `block in load_spec_files'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/configuration.rb:1224:in `each'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/configuration.rb:1224:in `load_spec_files'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/runner.rb:97:in `setup'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/runner.rb:85:in `run'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/runner.rb:70:in `run'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/lib/rspec/core/runner.rb:38:in `invoke'
    from /opt/rubies/2.1.2/lib/ruby/gems/2.1.0/gems/rspec-core-3.2.2/exe/rspec:4:in `<top (required)>'
    from /opt/boxen/rbenv/versions/2.1.2/bin/rspec:23:in `load'
    from /opt/boxen/rbenv/versions/2.1.2/bin/rspec:23:in `<main>'

module.js:485
    throw err;
          ^
SyntaxError: /projects/flakey-rspec-tests/rspecToConclusion-1.json: Unexpected end of input
    at Object.parse (native)
    at Object.Module._extensions..json (module.js:482:27)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
    at /projects/rspec-to-conclusion/lib/rspec-runner.js:41:23
    at runAndSummarize (/projects/rspec-to-conclusion/lib/rspec-to-conclusion.js:18:15)
    at rspecToConclusion (/projects/rspec-to-conclusion/lib/rspec-to-conclusion.js:51:20)
    at Object.<anonymous> (/projects/rspec-to-conclusion/bin/rspec-to-conclusion:12:8)
```

## Add debug library, and helpful debug stuff

It would be nice if I could type:

    DEBUG=* rspec-to-conclusion

And get something meaningful about it.

## Support Bundler?

Some people *always* type `bundle exec rspec` and never type `rspec`

Can this be supported.. say.. with:

    rspec-to-conclusion --use-bundler

Or perhaps it's auto-detected if a `Gemfile` is in the directory where
you're running from.. if so, then `bundle exec` will be used.. but you
could turn it off with:

    rspec-to-conclusion --no-use-bundler

## Break apart

Some of the JavaScript is big, munged together, and not specd.

Why not break it apart, sprinkle in some Immutable.js, and add some
coverage?

## Add '--help' support (usage)

There's no usage. There should be.
