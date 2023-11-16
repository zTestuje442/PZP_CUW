$certName = Read-Host -Prompt 'Podaj nazwę certyfikatu'
$authority = Read-Host -Prompt 'Podaj nazwę urzędu'
$password = Read-Host -Prompt "Podaj hasło klucza prywatnego" -AsSecureString
$cert=New-SelfSignedCertificate -CertStoreLocation "cert:\CurrentUser\My" -KeyAlgorithm RSA -KeyLength 2048 -FriendlyName $certName -Subject "CN=$authority" -KeyUsage DataEncipherment
Export-Certificate -Cert $cert -FilePath "$certName.cer"
Export-PfxCertificate -Cert $cert -FilePath "$certName.pfx" -Password $password
($cert) | Remove-Item