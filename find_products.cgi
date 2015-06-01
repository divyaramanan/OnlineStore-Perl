#!/usr/bin/perl
#	Sample perl cgi script.  This script prints a list of the 
#	products in the opatija proj3.products table.

   
use DBI;
use CGI::Carp qw(fatalsToBrowser);
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "proj3";
my $username = "jadrn039";
my $password = "console";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $query = CGI->new;

my $name = $query->param('findstr');

my $sth = $dbh->prepare("SELECT sku, category, title, short_description, long_description, cost, retail FROM products  WHERE title LIKE '%$name%' OR category LIKE '%$name%' OR sku LIKE '%$name%' OR short_description LIKE '%$name%'");
$sth->execute();



$str = "";
$k=0;
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str .= $item."|";
		$k=1;
        }       
    $str .= ";";    
    }
if($k == 0)
{
$str="no";
}
print "Content-type:  text/html\n\n";
$sth->finish();
$dbh->disconnect();

    	
print $str;


