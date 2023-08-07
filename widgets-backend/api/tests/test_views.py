from django.urls import reverse
from rest_framework.test import APITestCase

from api.models import Widget


class Test_Widget(APITestCase):

    @classmethod
    def setUpTestData(cls):
        for name, manufacturer, stock in [
            ("foo", "bar", 3),
            ("baz", "qux", 2),
            ("quux", "corge", 1)
        ]:
            Widget.objects.create(
                name=name, manufacturer=manufacturer, stock=stock
            )

    def test_get_list(self):

        url = reverse(
            "widget-list", urlconf="api.urls", current_app="api"
        )

        response = self.client.get(url)

        self.assertEqual(200, response.status_code)
        self.assertEqual(
            [
                {"id": 2, "name": "baz", "manufacturer": "qux", "stock": 2},
                {"id": 1, "name": "foo", "manufacturer": "bar", "stock": 3},
                {"id": 3, "name": "quux", "manufacturer": "corge", "stock": 1}
            ],
            response.json()
        )

    def test_update_widget(self):

        url = reverse(
            "widget-detail", urlconf="api.urls", current_app="api", kwargs={"pk": 1},
        )
        name = "phalange"
        manufacturer = "regina"
        stock = 5

        response = self.client.put(url, data={
            "name": name, "manufacturer": manufacturer, "stock": stock
        })

        self.assertEqual(200, response.status_code)
        actual = response.json()
        expected = {
            "id": 1, "name": name, "manufacturer": manufacturer, "stock": stock
        }
        self.assertEqual(expected, actual)
        obj = Widget.objects.get(id=1)
        self.assertEqual(name, obj.name)
        self.assertEqual(manufacturer, obj.manufacturer)
        self.assertEqual(stock, obj.stock)

    def test_create_widget(self):

        url = reverse(
            "widget-list", urlconf="api.urls", current_app="api"
        )
        name = "phalange"
        manufacturer = "regina"
        stock = 5
        new = {"name": name, "manufacturer": manufacturer, "stock": stock}

        response = self.client.post(url, data=new)

        self.assertEqual(201, response.status_code)
        actual = response.json()

        expected = new | {"id": 4}
        obj = Widget.objects.get(id=actual["id"])
        for k, v in expected.items():
            self.assertEqual(v, actual[k])
            self.assertEqual(v, getattr(obj, k))

    def test_delete_competition(self):

        url = reverse(
            "widget-detail", urlconf="api.urls", current_app="api", kwargs={"pk": 1},
        )
        response = self.client.delete(url)
        self.assertEqual(204, response.status_code)

        self.assertEqual(
            0, len(Widget.objects.filter(id=1))
        )
