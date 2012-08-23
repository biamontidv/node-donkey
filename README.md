[![build status](https://secure.travis-ci.org/biamontidv/node-donkey.png)](http://travis-ci.org/biamontidv/node-donkey)
# Donkey: EIP for JavaScript, node style.
Donkey provides an integration framework based on Enterprise Integration Patterns for JavaScript.

With Donkey, you don't need to reinvent the wheel everytime you want to write something to a file
or send something to a message queue (e.g. RabbitMQ): you just tell Donkey and he will relentlessly do it!


## Small example

First of all tell Donkey the routes you want it to walk:

        <route>
            <from uri='direct://inOrders'/>
            <to uri='log://MyLogger?level=log'/>
        </route>

Here is another definition:

        <route>
            <from uri='file://orders/incoming?delay=10000'/>
            <multicast>
                 <to uri='log://orders_orig?level=log'/>
                 <to uri='amqp://orders'/>
            </multicast>
        <route>
        <route>
            <from uri='amqp://orders'>
            <choice>
                 <when>
                    <simple>filterA</simple>
                    <to uri='log://filterA?level=log'/>
                </when>
                <when>
                    <simple>filterB</simple>
                    <to uri='log://filterB?level=log'/>
                 </when>
            </choice>
        </route>

Donkey offers you patterns to organise you routes and endpoints to interface with the world.

## Patterns and components

## Installation
Donkey is not yet available on the npm repository, but the package.json is properly setup.
Until I add a script, you wil have to:

1.  create a `node_modules` folder if not already there
2.  in `node_modules`, create a simlink pointing at each subfolders of `lib/node-donkey/components` and call them `donkey-<componentName>`

In order to use components that are not part of the donkey core (e.g. [donkey-amqp](https://github.com/biamontidv/donkey-amqp)),
you need of course to install that first, simply using npm.

## TODO
This is a loooong list, Donkey is just born!

*   refactor as needed :)
*   refactor and add tests
*   add documentation
*   add examples
*   add new patterns
*   finish existing components/endpoints (e.g. add a file reader [file consumer])
*   add new components/endpoints (object, ftp, tcp/udp, http, atom, etc etc)
*   ...
*   pick up and listen constructive comments from the community!

## Acknowledgments
Well, I guess the biggest sources of inspiration are Apache Camel and the EIP book. Very good work and great ideas!