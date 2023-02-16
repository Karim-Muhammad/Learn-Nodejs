<!-- [need revision] -->

#### What is difference between *Apache Server* vs. *Nodejs*?
- Apache Server:
  > Make a Thread for each Request, means if we have 1M requests then Apache will make 1M Threads and this number is Huge! and need server very powerful and has a so huge cores and CPUs for process all these threads, if threads > cores this will be risky and instead of processing all of these requests fast, it will be very slow because of Threading Schedluing

- Nodejs
  > Handle all requests in the same thread asyncronusly using Event loop that check always(infinite loop) on callstack if empty to then execute other tasks that exist in Macro/Micro tasks

##### What is Thread?
> Every Program is has a one process, and each process may contains more than one thread, thread is set of instructions, in each CPU number of cores (in average 12 cores), and thread seize/reserves on Core for process all codes that exist in within Thread, means if we have 12 threads only, then all of them will works fine and almost same time processing, but if we have one addition (+13) then operating system will handle these threads by something called *Thread Schedluing* that make all threads works during p rocessing other threads not after end one, by example, first 12 threads will work + one waiting after some duration (OS determine it) waiting thread enter to be made processing some time and then back to be waiting again, and so on, like (Async logic) but this happen when number of threads exceeds number of cores, resulting , you will notice in this case the time that threads will take (in case num_threads > num_cores) greater! and to see this in real example see *threading.js* file that use `encrypt` module that works with threading because the encryption take so huge time as we know, and what helped this module to works with threads, this module made by C++ language not JS(not support threads)
> this means the tasks that take huge time like **encryption** should works with threads? YES, with no doubt, why? because if we did task with asyncronus approach, it will be last task

#### If I made a request, server will take this request and process it, it mat take 5s, someone else came a made another request, server didn't fisish my request, then there are 2 ways to handle this new request

1. multi-threads, make a new server to handle new request (not practical of course)
2. make all requests asynchronous, means all running with together
   not all requests go to server, they can go to file system modules to work on, or crypto modules, it can any modules do operation, not only server
#### Difference between MultiThreading vs. Asyncronus
MultiThreading:
Asyncronus:

#### Threading Schedule (operating system)


<!--  -->

#### Event Loop
are there any running process?
are there any callbacks waiting?

#### Nodejs consist of
1. V8 (some C++ and JS) (Single Thread)
2. Libuv (All Library made by Pure C++) (some functions Multi-Threads)
   > This library that make javascript dealing with file systems