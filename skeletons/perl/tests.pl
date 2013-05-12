use Test::Simple tests => 1;
use strict;
use warnings;
use std;

setup();
std::in("hello world");
ok( "hello world" eq in_stdout(), "Root program");
cleanup();

sub setup {
    open(STDOUT, '>', "std_out_result");
}

sub in_stdout {
    open(FILE,"std_out_result");
    my $res = <FILE>;
    close(FILE);
    $res;
}

sub cleanup {
    close(STDOUT);
    unlink "std_out_result";
}
