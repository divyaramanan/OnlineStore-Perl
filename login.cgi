#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;




my $q = new CGI;
my $user = $q->param("user");
my $password = $q->param("pass");

open DATA, "</home/jadrn039/cgi-bin/proj3/passwords.dat" or die "Cannot open file.";
@file_lines = <DATA>;
close DATA;

$OK = 0; #not authorized

foreach $line (@file_lines) {
    chomp $line;
    ($stored_user, $stored_pass) = split /=/, $line;    
    if($stored_user eq $user && check_password($stored_pass, $password)) {
        $OK = 1;
        last;
        }
    }
      

 
if($OK == 0) {
    open FILE, "</home/jadrn039/cgi-bin/proj3/login.txt" or die "Error, cannot open file";    
    @lines = <FILE>;
    close FILE;
    print "Content-type:  text/html\n\n";     
    foreach $line (@lines) {
        print $line;
        }
    exit; # terminate the script after printing
    }

print "Content-type: text/html\n\n";

open FILE, "</home/jadrn039/public_html/proj3/page.html" or die "Cannot open file";
@lines = <FILE>;    
close FILE;     
foreach $line (@lines) {
    print $line;
    }
exit; # terminate the script after printing
    
    





