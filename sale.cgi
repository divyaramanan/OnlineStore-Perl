#!/usr/bin/perl
#	Sample perl cgi script.  This script prints a list of the 
#	products in the opatija proj3.products table.
#
#
   
use DBI;
use CGI::Carp qw(fatalsToBrowser);
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn039";
my $username = "jadrn039";
my $password = "console";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $query = CGI->new;

my $qry = $query->param('sql');

my $sth = $dbh->do($qry);



$dbh->disconnect();

    	


