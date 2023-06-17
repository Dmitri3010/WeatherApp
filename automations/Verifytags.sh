if git rev-list build >/dev/null

then

    echo "gogo"

else
    echo "WRONG"
    exit
fi